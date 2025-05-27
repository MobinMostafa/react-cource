// import Stripe from 'stripe';
// import User from '../models/user.js';



export const createConnectAccount = async (req, res) => {
    // const user = req.user;
    console.log("request user token is",req.user)
    // console.log("User in createConnectAccount", user);
    // if (!user.stripeAccountId) {
    //     // Create a new Stripe account
    //     const account = await Stripe.accounts.create({
    //     type: 'express',
    //     email: user.email,
    //     });
    
    //     // Save the Stripe account ID to the user
    //     User.stripeAccountId = account.id;
    //     await user.save();
    // }
    
    // res.json({
    //     ok: true,
    //     message: "Stripe account created successfully",
    //     stripeAccountId: user.stripeAccountId,
    // });
    }