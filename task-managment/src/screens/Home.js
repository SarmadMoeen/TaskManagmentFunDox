import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText as MuiListItemText,
  ListItemSecondaryAction,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Drawer,
  Divider,
  ListItemAvatar,
  ListSubheader,
  Snackbar,
  Slide,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios"; // Import the axios library
import background from "../assets/background/background.jpg";

import { AuthContext } from "../ContextApi/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  const LoggedInUserID = user.id;
  console.log("userId:", LoggedInUserID);

  const [tasks, setTasks] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isCollaboratorsLoaded, setCollaboratorsLoaded] = useState(false);

  const handleTaskComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: true } : task
      )
    );

    // Show success snackbar
    showSuccessSnackbar("Task is Completed");

    // Update completedTasks with the new completed task ID
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskId]);
  };

  const handleTaskIncomplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: false } : task
      )
    );

    // Update completedTasks by removing the completed task ID
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((id) => id !== taskId)
    );
  };

  const handleTaskDelete = (_id) => {
    axios
      .delete(`http://localhost:3000/deleteTask/${_id}`)
      .then(() => {
        // Update the state to remove the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));

        // Show success snackbar
        showSuccessSnackbar("Task is Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Show error snackbar if the API call fails
        showErrorSnackbar("Failed to delete task");
      });
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // State to store the form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // State to manage completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to fetch tasks from the backend API
  const fetchTasks = () => {
    axios
      .get("http://localhost:3000/getTasks")
      .then((response) => {
        // Assuming the response contains an array of tasks
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        // Handle error if the API call fails
      });
  };

  // Function to fetch collaborators from the backend API
  const fetchCollaborators = useCallback(() => {
    axios
      .get("http://localhost:3000/getAllUsers")
      .then((response) => {
        // Assuming the response contains an array of collaborators
        const filteredCollaborators = response.data.filter(
          (collaborator) => collaborator._id !== LoggedInUserID
        );
        setCollaborators(filteredCollaborators);
        setCollaboratorsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching collaborators:", error);
        // Handle error if the API call fails
      });
  }, [LoggedInUserID]); // Include LoggedInUserID in the dependency array

  // Fetch tasks and collaborators from the backend when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchCollaborators();
  }, [fetchTasks, fetchCollaborators]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both title and description are filled
    if (!formData.title || !formData.description) {
      alert("Please fill in both the title and description fields.");
      return;
    }

    // Make the API call to post the task data
    axios
      .post("http://localhost:3000/postTasks", formData)
      .then((response) => {
        // Assuming the response contains the newly created task data with an id
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: response.data.id,
            title: formData.title,
            description: formData.description,
            completed: false,
          },
        ]);

        // Show success snackbar
        showSuccessSnackbar("New Task is Added");

        // Reset the form fields after successful submission
        setFormData({ title: "", description: "" });
      })
      .catch((error) => {
        console.error("Error posting task:", error);
        // Show error snackbar if the API call fails
        showErrorSnackbar("Failed to add task");
      });
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // State to manage the success snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Function to show the success snackbar
  const showSuccessSnackbar = (message) => {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
  };

  // Function to show the error snackbar
  const showErrorSnackbar = (message) => {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management System
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={user.profilePhoto}
              alt={user.name}
              style={{ marginRight: "1rem" }}
            />
            <Typography variant="subtitle1" style={{ marginRight: "1rem" }}>
              {user.name}
            </Typography>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Logout
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <List
          sx={{ width: 240 }}
          subheader={<ListSubheader>Collaborators</ListSubheader>}
        >
          {isCollaboratorsLoaded &&
            collaborators.map((collaborator) => (
              <ListItem button key={collaborator._id}>
                <ListItemAvatar>
                  <Avatar
                    src={collaborator.profilePhoto}
                    alt={collaborator.name}
                  />
                </ListItemAvatar>
                <MuiListItemText primary={collaborator.name} />
              </ListItem>
            ))}
        </List>
        <Divider />
      </Drawer>

      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
          Welcome, {user.name}!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Add Task
          </Button>
        </form>

        <List style={{ marginTop: "2rem" }}>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <MuiListItemText
                primary={task.title}
                secondary={task.description}
                style={{
                  textDecoration: completedTasks.includes(task._id)
                    ? "line-through"
                    : "none",
                  color: completedTasks.includes(task._id) ? "green" : "inherit",
                }}
              />
              <ListItemSecondaryAction>
                {completedTasks.includes(task._id) ? (
                  <IconButton
                    edge="end"
                    aria-label="incomplete"
                    onClick={() => handleTaskIncomplete(task._id)}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    onClick={() => handleTaskComplete(task._id)}
                  >
                    <CheckIcon />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleTaskDelete(task._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>

      {/* Snackbar to show success and error messages */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
