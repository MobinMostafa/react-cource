import express from 'express';
import { createHotel} from '../controllers/hotel.js';
import { requireSignIn } from '../middleware/index.js';  
import formidable from 'express-formidable';

const router = express.Router();


// router.get('/hotels', getHotels);
// router.get('/hotels/:id', getHotel);
router.post('/create-hotel',requireSignIn, formidable(), createHotel);
// router.put('/hotels/:id', verifyAdmin, updateHotel);
// router.delete('/hotels/:id', verifyAdmin, deleteHotel);


export default router;