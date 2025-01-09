import mysql from "mysql2/promise";
import * as  dotenv from "dotenv"

//configuracion de la base de datos con variables de entorno
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password", 
    database: process.env.DB_DATABASE || "customer_service" //base de datos servicio al cliente
};

//conexion a la base de datos con promesa asincronica
async function connectToDatabase () {
    try{
        const db = await mysql.createConnection(dbConfig);
        console.log ("conectado a la base de datos MySQL");
        await db.execute("SELECT 1"); //prueba de conexion
        return db;
    } catch (error){
        console.log("Error al conectar con la base de datos", error)
        process.exit(1); //salir si falla la conexion
    };
};

module.exports = {connectToDatabase};