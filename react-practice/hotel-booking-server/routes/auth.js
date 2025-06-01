import express from 'express';
import { loginController, registerController, getUser } from '../controllers/auth.js';
import { requireSignIn } from '../middleware/index.js'; 

const router = express.Router();


router.post('/auth/login', loginController);
router.post('/auth/register', registerController );
router.get("/user",requireSignIn , getUser);

export default router;