import express from 'express';
import { loginController, registerController } from '../controllers/auth.js';

const router = express.Router();


router.post('/auth/login', loginController);
router.post('/auth/register', registerController );

export default router;