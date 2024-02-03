import pg from "pg";
import dotenv from "dotenv";
dotenv.config();


const dataBase = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT
})

dataBase.connect().then(()=>
    console.log("database connection succesfull")
).catch((error)=>console.log("error: ",error.message))

export default dataBase;