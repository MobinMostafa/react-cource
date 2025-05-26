import Auth from "../models/auth.js";
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => { 
   // console.log(req.body);
   // res.send("User registered successfully");
   const { username, email, password } = req.body;

   // validation 
   if(!username) {
      return res.status(400).send("Username is required");
   }
   if(!password || password.length < 6) {
      return res.status(400).send("Password is required and should be at least 6 characters long");
   }

   const userExists = await Auth.findOne({email}).exec();
   if(userExists){
      res.status(400).send("Email is already taken");
      return;
   }
   // create user
   const user = new Auth(req.body);
   try{
      await user.save();
      // console.log("User created successfully", user);
      return res.json({
         ok: true,
         message: "Registration successful! Please login to continue.",
      });

   }catch(err){
     console.log("create user failed", err);
     return res.status(400).send("Error. Try again");
   }
}
export const loginController = async (req, res) => {
   const { email, password } = req.body;
   // console.log(req.body);
   try{

      let user = await Auth.findOne({email}).exec();
      if(!user){
         return res.status(400).send("User not found. Please register first.");
      }
    
      user.comparePassword(password, (err, match) => {
         if(!match || err){
            return res.status(400).send("Login failed. Please try again.");
         }
         // create JWT token
         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
         });

         res.json({ token, user });

      });
    ;
     

   }catch(error){
      console.log("Login failed", error);
      return res.status(400).send("Login failed. Please try again.");
   }
}