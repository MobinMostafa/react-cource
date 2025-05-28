import express from 'express';
// middleware
import {requireSignIn} from '../middleware/index.js';

import { createConnectAccount, getAccountStatus } from '../controllers/stripe.js';



const router = express.Router();

router.post('/create-connect-account', requireSignIn, createConnectAccount);
router.post('/get-account-status', requireSignIn, getAccountStatus);

export default router;