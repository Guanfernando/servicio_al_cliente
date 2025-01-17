import registerUser from '../controllers/authControllers.js';
import express from 'express';


const router = express.Router();
router.post ("/register" , registerUser); //ruta para registrar un usuario

export default router;  