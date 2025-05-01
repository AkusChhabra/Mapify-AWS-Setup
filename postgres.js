import dotenv from "dotenv";
dotenv.config()
import express from "express";
import pg from "pg";
import fs from "fs";

const {Pool} = pg

console.log("PGUSER: ", process.env.PGUSER)

const db_config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: { 
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('./rds-ca-cert.pem').toString(), //rds-ca-rsa2048-g1
    } 
}

const pool = new Pool(db_config)

await pool.connect()
.then(()=>{console.log("connected to db")})
.catch(()=>{console.log("unable to connect to db")})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res) => {
    res.send("hello from backend")
})

async function getData() {
    const result = await pool.query("SELECT *;")
    console.log(result.rows)
}

getData()

app.listen(3000,() => {
    console.log("port connnected")
})