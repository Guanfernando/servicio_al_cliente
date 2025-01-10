import registerUser from '../controllers/authControllers.js';
import express from 'express';


const router = express.Router();
router.post ("/regsiter" , registerUser);

export default router;  