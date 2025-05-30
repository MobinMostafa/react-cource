
import jwt from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    // console.log("Decoded User:", req.user); // Debugging log
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(403).json({ error: "Invalid token" });
  }
};



