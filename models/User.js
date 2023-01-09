class User{
    constructor(login, email, password, id) {
        this.id = id
        this.login = login
        this.email = email
        this.password = password
    }
}

module.exports = User