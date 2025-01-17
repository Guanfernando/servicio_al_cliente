import { Form, Stack, Row, Col, Button, Image } from "react-bootstrap";
import React, { useState } from "react";

const Register = () => {
  // Estados para los campos del formulario
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null); // Para enviar mensaje de éxito o error

  // Función para el envío de los datos del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar recarga de la página

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    // Datos a enviar
    const data = {
      numeroDocumento: id,
      nombre: name,
      apellido: lastName,
      email: email,
      clave: password,
      confirmarClave: confirmPassword
    };

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

      if (response.ok) {
        const result = await response.json();
        setMessage("Registro exitoso: " + result.message); // Mostrar mensaje de éxito
      } else {
        const error = await response.json();
        setMessage("Error: " + error.message); // Mostrar mensaje de error
      }
    } catch (err) {
      setMessage("Error en el servidor. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Stack gap={2} className="col-md-8 mx-auto">
      {/* Mostrar mensaje de error o éxito */}
      {message && <div className="alert alert-danger">{message}</div>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group as={Col} md="8" controlId="id">
              <Form.Label>Número Documento</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Documento"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="name">
              <Form.Label>Nombres Completos</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombres"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="lastName">
              <Form.Label>Apellidos Completos</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="confirmPassword">
              <Form.Label>Confirmar Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirmar Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                type="checkbox"
                label="Acepta las políticas de manejo de datos"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Col>

          <Col>
            <Image src="/images/logos_paseexpress.png" />
          </Col>
        </Row>
      </Form>
    </Stack>
  );
};

export default Register;
