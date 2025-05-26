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
    minLength: 6,
    maxLength: 64,
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
  stripeAccountId: { type: String, default: null },
  stripeSeller: { type: Object, default: {} },
  stripeSession: { type: Object, default: {} },
}, { timestamps: true });

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.hash(user.password, 12, (err, hash) => {
      if (err) {
        console.log("bcrypt hash error", err);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

export default mongoose.model("Auth", userSchema);
