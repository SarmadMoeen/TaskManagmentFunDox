const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')


// Login
router.post('/login',controller.login );

// User registration
router.post('/userRegister',controller.SignIn);

// Get all users (requires authentication)

router.get('/getAllUsers',controller.getAll)


module.exports = router;
