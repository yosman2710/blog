import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();
console.log(typeof(register));

router.post('/register', register);

router.post('/login', login);

export default router;