import mysql from 'mysql2'

export default mysql.createPool({
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE_NAME,
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    connectionLimit : 10
}).promise()
