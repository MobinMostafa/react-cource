import Stripe from 'stripe';
import Auth from '../models/auth.js';
import queryString from 'query-string';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized request" });
    }
       //find user from db
    const user = await Auth.findById(req.user._id).exec();
    // if user does not have stripe account than create
    if (!user.stripeAccountId) {
        const account = await stripe.accounts.create({ type: 'express' });
        user.stripeAccountId = account.id;
        await user.save();
    }
//res json data
    // res.json({
    //     ok: true,
    //     message: "Stripe account created successfully",
    //     stripeAccountId: user.stripeAccountId,
    // });

    // let loginLink = await stripe.account.createLoginLink(user.stripeAccountId);
    // const queryParams = queryString.stringify({ stripe_user_email: user.email });
    // const link = `${loginLink.url}?${queryParams}`;
    let accountLink = await stripe.accountLinks.create({
        account: user.stripeAccountId,
        refresh_url: `${process.env.STRIPE_REDIRECT_URL}`,
        return_url: `${process.env.STRIPE_REDIRECT_URL}`,
        type: 'account_onboarding',
    })

    accountLink = Object.assign(accountLink,{
        "stripe_user[email]" : user.email || undefined,
    });

    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    // console.log("login link : ",link);
    res.send(link);
    
};
const updateDelayDays = async (accountId) => {
    const account  = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                }
            }
        }
    })
    return account;
}

export const getAccountStatus = async (req, res) => {
  const user = await Auth.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripeAccountId);

  //update delay days
  const updatedAccount = await updateDelayDays(account.id);

  const updatedUser = await Auth.findByIdAndUpdate(
    user._id,
    { stripeSeller: updatedAccount },
    { new: true }
  ).select("-password").exec();

//   console.log("Updated User:", updatedUser); // Debugging log
  res.json(updatedUser);
};


export const getAccountBalance = async (req, res) => {
           //find user from db
    const user = await Auth.findById(req.user._id).exec();

    try{
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripeAccountId
        });
        // console.log("balance here",balance);
        res.json(balance);
    }catch(error){
     console.log(error)
    }

}

export const payoutSetting = async (req,res) => {
    try{
      const user = await Auth.findById(req.user._id).exec();
      const loginLink = await stripe.accounts.createLoginLink(user.stripeAccountId,{
        redirect_url: process.env.STRIPE_SETTING_URL
      });
    //   console.log(loginLink, "loginlink here payout setting");
      res.json(loginLink);
    }catch(error){
       console.log(error, "payout setting error")
    }
}
