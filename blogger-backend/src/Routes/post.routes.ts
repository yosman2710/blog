import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Ruta para registrar nuevos usuarios
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

export default router;