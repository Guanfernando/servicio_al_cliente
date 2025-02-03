import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
        <h1>Login</h1>
        <Button variant="primary" type="button" onClick={() => navigate("/register")}>Registrarse</Button>
        </div>
    );
};

export default Login;