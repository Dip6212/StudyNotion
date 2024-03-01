const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile=require("../models/Profile");
require("dotenv").config();


// send OTP

exports.sendOTP=async(req,res)=>{

    try {

        const {email}=req.body;

        const checkUser=await User.findOne({email});

        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"user already exsists",
            })
        }

        // if not present then generate otp

        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log(otp);

        // check for uniqe OTP

        let result=await OTP.findOne({otp: otp});

        while(result){

            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result=await OTP.findOne({otp: otp});
        }
            
        const otpPayload={email,otp};

        // create entry for otp
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp,
        })

        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



// sign up
exports.signUp = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
		// Create the user
		const approved = accountType === "Instructor" ? false : true;

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});

        console.log(profileDetails);
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
		});
        console.log(user);

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};



// log in

exports.logIn =async (req,res)=>{
    try {
        // get info from req body
        const {email,password}=req.body;
        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"all fields are required",
            })
        }
        // user existence check
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registered, please sign up",
            })
        }
        // check password
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
        
        // generate jwt token
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        user.token=token;
        user.password=undefined;
        // create cookie and res sen
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in successfully",
        })
        }

        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login failure,please try again",
        });
    }
}

// reset password
exports.changePassword=async (req,res)=>{
    try {
        // get Data from req
        const userDetails=await User.findById(req.user.id);
        // get oldPassword,newPassword,confirmPassword
        const {oldPassword,newPassword,confirmNewPassword}=req.body;
        // validation old password
        const isPasswordMatch=await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        if(!isPasswordMatch){
            return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
        }

        if(newPassword!==confirmNewPassword){
            return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
        }

        // update pwd in DB
        const encryptPassword=await bcrypt.hash(newPassword,10);
        const updateUserDetails=await User.findByIdAndUpdate(
            req.user.id,
            {password:encryptPassword},
            {new:true}
        );
        // send mail - password updated
        // try {
        //     const emailResponse=await mailSender(
        //         updateUserDetails.email,
        //         passwordUpdate(
        //             updateUserDetails.email,
        //             `password updated successfully for ${updateUserDetails.firstName} ${updateUserDetails.lastName}`
        //         )
        //     );
        // } catch (error) {
        //     return res.status(500).json({
        //         success:false,
        //         message:"something went wrong while sending mail",
        //     });

        // }
        return res.status(200).json({ success: true, message: "Password updated successfully" });
        // return password
    } catch (error) {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}