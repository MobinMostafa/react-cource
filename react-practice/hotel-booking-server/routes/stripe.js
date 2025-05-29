import express from 'express';
// middleware
import {requireSignIn} from '../middleware/index.js';

import { createConnectAccount, getAccountStatus, getAccountBalance } from '../controllers/stripe.js';



const router = express.Router();

router.post('/create-connect-account', requireSignIn, createConnectAccount);
router.post('/get-account-status', requireSignIn, getAccountStatus);
router.post('/get-account-balance', requireSignIn, getAccountBalance);

export default router;