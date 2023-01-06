const db = require('../db')
const UserService = require('../services/user.service')
const User = require("../models/User");
class UserController{
    async createUser(req, res){
        const {login, password} = req.body
        const user = new User(login, password)
        const newPerson = await UserService.createUser(user)
        res.json(newPerson)
    }

    async getUsers(req, res){
        const users = await UserService.getUsers()
        res.json(users)
    }

    async getUserById(req, res){
        const id = req.params.id
        const user = await UserService.getUserById(id)
        res.json(user)
    }

    async updateUser(req, res){
        const {id, login, password} = req.body
        const user = new User(login, password, id)
        const uUser = await UserService.updateUser(user)
        res.json(uUser)
    }

    async deleteUser(req, res){
        const id = req.params.id
        const user = await UserService.deleteUser(id)
        res.json(user)
    }
}

module.exports = new UserController()