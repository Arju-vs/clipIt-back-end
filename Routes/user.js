const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user')
const auth = require('../middleware/authentication')

// signUp
router.post('/signUp', UserController.signUp)

// login
router.post("/login", UserController.signIn)

// logout
router.post("/logout", UserController.logout)

// getUser
router.get('/user/:userId',auth,UserController.getUser)

// edit
router.put("/:id/edit", auth, UserController.editUser)

router.delete('/delete/:id', auth , UserController.deleteUser)


module.exports = router
