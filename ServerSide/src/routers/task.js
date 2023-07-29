
const express = require('express');
const router = new express.Router();


const Controller = require('../controllers/taskController');



    router.post("/postTasks",Controller.PostTask )

    router.get("/getTasks", Controller.GetTasks)

    router.get("/getTask/:id", Controller.GetTask)

    router.patch("/updateTask/:id",Controller.UpdateTask)

    router.delete("/deleteTask/:id", Controller.DeleteTask)

module.exports = router;
