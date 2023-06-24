const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')

// Route for creating a new user
router.post('/users', UserController.createUser)

// Route for checking if a user exists with an email
router.get('/users/check-email', UserController.getUserByEmail)

// Route for getting a user by ID
router.get('/users/:id', UserController.getUserById)

// Route for updating the email of a user by ID
router.put('/users/:id/email', UserController.updateUserEmail)

// Route for updating the password of a user by ID
router.put('/users/:id/password', UserController.updateUserPassword)

// Route for deleting a user in the database
router.delete('/users/:id', UserController.deleteUser)

module.exports = router;