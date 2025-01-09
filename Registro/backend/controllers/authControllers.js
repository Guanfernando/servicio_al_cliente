const bcrypt = require ("bcrypt"); //modulo para encriptar las contraseñas.

//funcion asinconica para el registro e un nuevo usuario.
 const registerUser = async (req, res) => {
    const db = req.app.get("db") //obtener la instancia de la base de datos
    const {tipoDocumento, numeroDocumento, nombre, apellido,  email} = req.body;

    //validacion para todos los campos
    if (!numeroDocumento, !nombre, !apellido, !email){
        return res.status(400).json({error: "Todos los campos son obligatorios"})
    }
 } 
