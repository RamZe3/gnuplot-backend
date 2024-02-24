const db = require('../db')

class UserService{
    async createUser(user){
        console.log("asdddddddddddddddddddddddddddddddd")
        const newPerson = await db.query('INSERT INTO users (login, email, password) values ($1, $2, $3) RETURNING *',
            [user.login, user.email, user.password])
        return newPerson.rows[0]
    }

    async getUsers(){
        console.log("asdddddddddddddddddddddddddddddddd")
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }

    async getUserById(id){
        console.log("asdddddddddddddddddddddddddddddddd")
        if (id === "null" || id === ""){
            return ''
        }
        else{
            const user = await db.query('SELECT * FROM users WHERE id= $1', [id])
            return user.rows
        }
    }

    async getUserByLoginAndPass(login, password){
        
        //login = "ram"
        //password = "asd"
        const user = await db.query('SELECT * FROM users WHERE (login= $1 OR email= $1) AND password= $2', [login, password])
        return user.rows[0]
    }

    async updateUser(user){
        const uUser = await db.query('UPDATE users set login = $1, email= $2, password = $3 where id = $4 RETURNING *',
            [user.login, user.email, user.password, user.id])
        return user.rows[0]
    }

    async deleteUser(id){
        const user = await db.query('DELETE FROM users WHERE id= $1', [id])
        return user.rows[0]
    }
}

module.exports = new UserService()