//Registro/backend/controllers/aunthcontrollers.js

import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    const db = req.app.get("db")
    const {numeroDocumento, nombre, apellido, email, clave,  confirmarClave, emailEmpresarial} = req.body; 
    
    console.log("Datos recibidos del cliente: ",req.body)

    //validacion para todos los campos.
    if (!numeroDocumento || !nombre || !apellido || !email || !clave || !confirmarClave || !emailEmpresarial) {
        return res.status(400).json({error: "Todos los campos son obligatorios."})
    };
   
    //validacion de la direccion de correo mediante expresion regular.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({error: "El formato de correo electrónico es inválido."});
    };

    if (clave.length < 6 || confirmarClave.length < 6) {
        return res.status(400).json({error:"la contraseña debe tener al menos 6 caracteres"});
    };

    //validación de las contraseñas
    if (clave !== confirmarClave) { 
        return res.status(400).json({error: "Las contraseñas no coinciden."});
    };

    try{
        const hashedclave = await bcrypt.hash(clave, 10);
    
        const [result] = await db.execute(
            "INSERT INTO usuarios (numeroDocumento, nombre, apellido, email, clave, emailEmpresarial) values (?,?,?,?,?,?)",
            [numeroDocumento, nombre, apellido, email, hashedclave, emailEmpresarial]
        );
    
        res.status(200).json({
            message: "Usuario registrado con éxito",
            insertId: result.insertId
        });

    }catch(error){
        console.error("Error al registrar usuario", error)

        if(error.code === "ER_DUP_ENTRY"){
            return res.status(400).json({error: "El correo ingresado ya esta registrado"})
        };

        res.status(500).json({error: "Error interno del servidor"});
    };
};

export default registerUser;