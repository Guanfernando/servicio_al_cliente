//scr/Components/register.js

import { Stack } from "react-bootstrap";
import React, { useState } from "react";
import RegisterForm from "./registerForm"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState(null); // Para enviar mensaje de éxito o error
  const [variant, setVariant] = useState(null); // Tipo de alerta (éxito o error)

  const handleSubmit = async (data) => {
    if (data.clave !== data.confirmarClave) {
      setMessage("Las contraseñas no coinciden.");
      setVariant("danger"); // Agregar esto para mostrar el mensaje correctamente
      return;
    }

    // Enviar datos a la API
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registro exitoso: " + result.message);
        setVariant("success"); // Mostrar mensaje de éxito
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setMessage("Error: " + result.message);
        setVariant("danger"); // Mostrar mensaje de error
        
      }
    } catch (err) {
      setMessage("Error en el servidor. Por favor, inténtalo de nuevo.");
      setVariant("danger"); // Mostrar mensaje de error
    }
  };
      

  return (
    <Stack gap={2} className="col-md-8 mx-auto">
      <RegisterForm onSubmit={handleSubmit} message={message} variant={variant} />
    </Stack>
  );
};

export default Register;


