export const registerController = (req, res) => { 
   console.log(req.body);
   res.send("User registered successfully");
}
export const loginController = (req, res) => {
   console.log(req.body);
}