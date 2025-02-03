//src/components/registerForm.js

import React, { useState } from "react";
import { Form, Row, Col, Button, Stack, Alert } from "react-bootstrap";



const RegisterForm = ({ onSubmit, variant, message}) => {
    
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailEmpresarial, setEmailEmpresarial] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const generatedEmail = (`${name.toLowerCase()}.${lastName.toLowerCase()}@paseexpress.com`);
    setEmailEmpresarial(generatedEmail);

    const data = {
      numeroDocumento:id,
      nombre: name,
      apellido: lastName,
      email: email,
      clave: password,
      confirmarClave: confirmPassword,
      emailEmpresarial: generatedEmail,
    };

    onSubmit(data);
  };

  return (
    <Stack gap={2} className="col-md-8 mx-auto">
      {message && <Alert variant={variant} dismissible>{message}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
        <h1>Registro de Usuarios</h1>
          <Col>
            
            <Form.Group controlId="id">
              <Form.Label>Número Documento*</Form.Label>
              <Form.Control type="number" placeholder="Documento" required value={id} onChange={(e) => setId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Nombres Completos*</Form.Label>
              <Form.Control type="text" placeholder="Nombres" required value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Apellidos Completos*</Form.Label>
              <Form.Control type="text" placeholder="Apellidos" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirmar Password*</Form.Label>
              <Form.Control type="password" placeholder="Confirmar Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check required type="checkbox" label="Acepta las políticas de manejo de datos" />
            </Form.Group>

            <Form.Group controlId="emailEmpresarial">
              <Form.Label>Correo Empresarial</Form.Label>
              <Form.Control type="text" value={emailEmpresarial} readOnly />  
            </Form.Group>
            </Col>
            <Button variant="primary" type="submit">Registrarse</Button>

          
        </Row>
      </Form>
    </Stack>
  );
};

export default RegisterForm;
