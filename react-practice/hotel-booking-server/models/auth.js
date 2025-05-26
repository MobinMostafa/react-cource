import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Name is required",
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  stripeAccountId: '',
 stripeSeller: {},
 stripeSession: {},
}, { timestamps: true });

userSchema.pre("save", function (next){
  let user = this;
  if(user.isModified("password")){
    return bcrypt.hash(user.password, 12, function(err, hash){
      if(err){
        console.log("bcrypt hash error", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  }
  return next();

})

export default mongoose.model("Auth", userSchema);