import { Router } from 'express';
import { getUserById, updateUserName } from '../controllers/user.controller';

const router = Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserName);

export default router;
