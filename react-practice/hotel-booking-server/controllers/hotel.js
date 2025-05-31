
import Hotel from "../models/hotel.js";
import fs from "fs";

export const createHotel = async (req, res) => {
    try {
        const fields = req.fields;
        const files = req.files;
        const hotel = new Hotel(fields);
        // handle images
        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }

        const savedHotel = await hotel.save();
        res.status(200).json(savedHotel);
        console.log(savedHotel, 'Hotel created successfully');
        
    } catch (err) {
        console.log(err, 'Error creating hotel');
        res.status(400).json({
            error: err.message
        });
    }
}