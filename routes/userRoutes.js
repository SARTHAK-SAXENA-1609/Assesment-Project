const express = require("express")
const routes = express.Router();
const bodyParser = require('body-parser')

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')


routes.post('/register',userController.registerUser)
routes.post('/login',userController.loginUser)
routes.get('/logout',userController.logoutUser)
routes.get('/me',auth.isAuthentiated,userController.loggedInUser)

// admin routes
routes.get('/admin/user',auth.isAuthentiated,auth.roles('admin'),userController.getUsers)
routes.get('/admin/user/:id',auth.isAuthentiated,auth.roles('admin'),userController.getAUser)
routes.put('/admin/user/:id',auth.isAuthentiated,auth.roles('admin', 'moderator'),userController.updateUser)
routes.delete('/admin/user/:id',auth.isAuthentiated,auth.roles('admin'),userController.delelteAUser)
module.exports =routes

