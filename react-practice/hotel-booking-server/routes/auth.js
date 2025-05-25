import express from 'express';
import { loginController, registerController } from '../controllers/auth.js';

const router = express.Router();


router.get('/auth/login', loginController);
router.get('/auth/register', registerController );

export default router;