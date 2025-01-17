//importar dependencias y rutas necesarias backend

import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db.js";
import router from "./routes/auth.js";


const app = express();

app.use(cors());// permitir solicitudes de dominios externos 
app.use (express.json()); //analizar el cuerpo de solicitudes en formato .JSON
app.use("/api/users", router); // ruta para el router de autenticación



//funcion para conexion asincrona para iniciar el servidor
async function startServer(){
    try{
        const db = await connectToDatabase(); //intenta la conexion a la base de datos
        app.set ("db", db); //almacena la conexion para que este disponible en otyras partes del codigo

        const PORT = process.env.PORT || 3001 //puerto del servidor.
        const server = app.listen(PORT, () =>{
            console.log ("Servidor en ejecucion en http://localhost:"+ PORT);
        });
        
        //manejo de un cierre limpio del servido con SIGINT (Ctrl + C)
        process.on("SIGINT", async () => {
            console.log ("Cerrando el servidor. . .")
            await db.end();
            server.close(() =>{
                console.log("Servidor cerrado.");
                process.exit(0);
            });
        })
    
    } catch(error){
        console.error("Error al tratar de inicar el servidor ", error);

    };

};

startServer();
