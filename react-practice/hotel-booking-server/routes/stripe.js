import express from 'express';
// middleware
import {requireSignIn} from '../middleware/index.js';

import { createConnectAccount } from '../controllers/stripe.js';



const router = express.Router();

router.post('/create-connect-account', requireSignIn, createConnectAccount);

export default router;