import express from 'express';
import { createHotel,getHotels, getHotelImage, sellerHotels} from '../controllers/hotel.js';
import { requireSignIn } from '../middleware/index.js';  
import formidable from 'express-formidable';

const router = express.Router();


router.get('/hotels', getHotels);
// router.get('/hotels/:id', getHotel);
router.post('/create-hotel',requireSignIn, formidable(), createHotel);
router.get('/hotel/image/:id', getHotelImage);
router.get('/seller-hotel',requireSignIn ,sellerHotels);
// router.put('/hotels/:id', verifyAdmin, updateHotel);
// router.delete('/hotels/:id', verifyAdmin, deleteHotel);


export default router;