const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'Qwerty100',
    host: 'localhost',
    port: '5432',
    database: 'gnuplotdb'
})

module.exports = pool