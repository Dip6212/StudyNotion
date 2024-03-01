
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");


// reset password token
exports.resetPasswordToken=async (req,res)=>{
    try {
        // get email from req body
        const email=req.body.email;
        // check user for this email
        const user=await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"your email is not registered",
            });
        }
        // generate token
        const token=crypto.randomBytes(20).toString("hex");
        // update user by adding token and expiration time
        const updateDetails=await User.findOneAndUpdate(
                                        {email: email},
                                        {
                                            token:token,
                                            resetPasswordExpires:Date.now() + 3600000,
                                        },
                                        {new:true}
        );
                                        console.log(updateDetails);
        // create url
        const url=`http://localhost:3000/update-password/${token}`;
        // send mail containing url
        await mailSender(email,
                        "Password Reset Link",
                        `password Reset Link: ${url}`
            );
            console.log(mailSender);

            // return res
            return res.json({
                success:true,
                message:"email sent successfully, check mail and change password",
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset password",
        });
    }
}

// reset password
exports.resetPassword=async (req,res)=>{

    try {
        // data fetch
        const{password,confirmPassword,token}=req.body;
        // validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"passwords don't match",
            });
        }
        // get user details from DB using token
        const userDeatils=await User.findOne({token: token});
        if(!userDeatils){
            return res.json({
                success:false,
                message:"token invalid",
            });
        }
        // token time check
        if(!(userDeatils.resetPasswordExpires>Date.now())){
            return res.json({
                success:false,
                message:"token has expired, please regenerate token",
            });
        }
        // hash password
        const hashedPassword=await bcrypt.hash(password,10);

        // password update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new:true},
        );

        // send res
        return res.status(200).json({
            success:true,
            message:"password reset successfully"
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset password",
        });
    }
}