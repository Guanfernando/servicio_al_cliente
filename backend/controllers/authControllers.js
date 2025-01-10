import bcrypt from "bcrypt";

//funcion asinconica para el registro e un nuevo usuario.
 const registerUser = async (req, res) => {
    const db = req.app.get("db") //obtener la instancia de la base de datos.
    const {tipoDocumento, numeroDocumento, nombre, apellido,  email, clave, confirmarclave} = req.body;

    //validacion para todos los campos.
    if (!tipoDocumento || !numeroDocumento || !nombre || !apellido || !email || !clave || !confirmarclave){
        return res.status(400).json({error: "Todos los campos son obligatorios."})
    };
   
    //validacion de la direccion de correo mediante expresion regular.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({error: "El formato de correo electrónico es inválido."});
    };

    if (clave.length < 6){
        return res.status(400).json({error:"la contraseña debe tenerr al menos 6 caracteres"});
    }

    //validación de las contraseñas
    if (clave != confirmarclave) {
        return res.status(400).json({error: "Las contraseñas no coinciden."});
    };

    //Encriptacion de la contraseña utilizando bcrypt con factur de 10

    try{
        const hashedclave = await bcrypt.hash(clave, 10);
    
    //insertamos la informacion del usuario en la base de datos.
    //utilizamos placeholders para evitar inyecciones SQL 
    const [result] = await db.execute(
        "INSERT INTO usuarios (tipoDocumento, numeroDocumento, nombre, apellido, email, clave) values (?,?,?,?,?,?)",
        [tipoDocumento, numeroDocumento, nombre, apellido, email, hashedclave]
    );
    
    //respuesta para el cliente con mensaje de éxito 
    res.status(200).json({
        message: "Usuario registrado con éxito",
        insertId: result.insertId
    });

    
    }catch(error){
    //registro de errores en la consola de depuracion.
    console.error("Error la registrar usuario", error)

    //si el eroro ocurre por un correo duplicado
    if(error.code == "ER_DUP_ENTRY"){
        return res.status(400).json ({error: "El correo ingresado ya esta registrado"})
    }

    //mensaje para cualquier otro error, enviamos una respuesta generica desde el servidor.
    res.status(500).json({error: "Error interno del servidor"});
    };

};

export default registerUser;


