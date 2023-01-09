const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/users', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/login', userController.getUserByLoginAndPass)
router.get('/users/:id', userController.getUserById)
router.put('/users', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router