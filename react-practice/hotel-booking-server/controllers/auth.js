import Auth from "../models/auth.js";

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
         ok: true
      });

   }catch(err){
     console.log("create user failed", err);
     return res.status(400).send("Error. Try again");
   }
}
export const loginController = (req, res) => {
   console.log(req.body);
}