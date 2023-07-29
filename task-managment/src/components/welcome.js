import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import background from '../assets/background/background.jpg';

const WelcomeAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to navigate to the "signin" page after 3 seconds
    const navigateToSignin = () => {
      navigate('/signin'); // Replace '/signin' with the actual route to your signin page
    };

    // Navigate to "signin" after 3 seconds
    const timer = setTimeout(navigateToSignin, 3000);

    // Clean up the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        animation: 'fadeIn 2s', // CSS animation for fading in the background image
      }}
    >
      <Fade in={true} timeout={2000}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontFamily: 'Arial', fontSize: '2rem' }}>
            Welcome to the Task Management System
          </Typography>
        </div>
      </Fade>
    </Box>
  );
};

export default WelcomeAnimation;
