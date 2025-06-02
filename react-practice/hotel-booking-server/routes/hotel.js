import express from 'express';
import { createHotel,getHotels, getHotelImage, sellerHotels, deleteHotel} from '../controllers/hotel.js';
import { requireSignIn, hotelOwner } from '../middleware/index.js';  
import formidable from 'express-formidable';

const router = express.Router();


router.get('/hotels', getHotels);
// router.get('/hotels/:id', getHotel);
router.post('/create-hotel',requireSignIn, formidable(), createHotel);
router.get('/hotel/image/:id', getHotelImage);
router.get('/seller-hotel',requireSignIn ,sellerHotels);
// router.put('/hotels/:id', verifyAdmin, updateHotel);
router.delete('/delete-hotel/:id', requireSignIn,hotelOwner, deleteHotel);


export default router;