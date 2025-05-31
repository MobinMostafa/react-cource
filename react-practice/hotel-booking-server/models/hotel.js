import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const hotelSchema = new Schema(
    {
        title: {
            type: String,
            required: "Title is required",
        },
        content: {
            type: String,
            required: "Description is required",
            maxlength: 10000,
        },
        location: {
            type: String,
            required: "Location is required",
        },
        price: {
            type: Number,
            trim: true,
            required: "price is required",
        },
        postedBy: {
            type: ObjectId,
            ref: "Auth",
        },
        image: {
            data: Buffer,
            contentType: String,   
        },
        bed: {
            type: Number,
            required: "bed is required",
        },
        from: {
            type: Date,
            required: "from is required",
        },
        to: {
            type: Date,
            required: "to is required",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
        

           