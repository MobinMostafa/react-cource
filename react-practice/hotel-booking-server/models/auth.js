import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 64,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    console.error("bcrypt hash error:", err);
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error("bcrypt compare error:", err);
    return false;
  }
};

export default mongoose.model("Auth", userSchema);
