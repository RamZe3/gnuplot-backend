const db = require('../db')

class UserService{
    async createUser(user){
        const newPerson = await db.query('INSERT INTO users (login, password) values ($1, $2) RETURNING *',
            [user.login, user.password])
        return newPerson.rows[0]
    }

    async getUsers(){
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }

    async getUserById(id){
        const user = await db.query('SELECT * FROM users WHERE id= $1', [id])
        return user.rows[0]
    }

    async updateUser(user){
        const uUser = await db.query('UPDATE users set login = $1, password = $2 where id = $3 RETURNING *',
            [user.login, user.password, user.id])
        return user.rows[0]
    }

    async deleteUser(id){
        const user = await db.query('DELETE FROM users WHERE id= $1', [id])
        return user.rows[0]
    }
}

module.exports = new UserService()