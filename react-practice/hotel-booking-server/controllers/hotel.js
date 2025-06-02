
import Hotel from "../models/hotel.js";
import fs from "fs";

export const createHotel = async (req, res) => {
    try {
        const fields = req.fields;
        const files = req.files;
        const hotel = new Hotel(fields);
        hotel.postedBy = req.user._id
        // handle images
        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        const savedHotel = await hotel.save();
        res.status(200).json(savedHotel);
        // console.log(savedHotel, 'Hotel created successfully');
        
    } catch (err) {
        console.log(err, 'Error creating hotel');
        res.status(400).json({
            error: err.message
        });
    }
}


export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({}).limit(24).select('-image.data').populate('postedBy', '_id name').exec();
        res.status(200).json(hotels);
    } catch (err) {
        console.log(err, 'Error getting hotels');
        res.status(400).json({
            error: err.message
        });
    }
}

// hotel image 

export const getHotelImage = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).exec();

   if (hotel.image.data){
    res.set('Content-Type', hotel.image.contentType);
    return res.send(hotel.image.data);
   }
}

export const sellerHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({postedBy: req.user._id}).select('-image.data').populate('postedBy', '_id name').exec();
        res.status(200).json(hotels);
    } catch (err) {
        console.log(err, 'Error getting hotels');
        res.status(400).json({
            error: err.message
        });
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id).exec();
        res.status(200).json(deletedHotel);
    } catch (err) {
        console.log(err, 'Error deleting hotel');
        res.status(400).json({
            error: err.message
        });
    }
}