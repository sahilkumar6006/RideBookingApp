import crypto from "crypto";
import { OTP } from "../models/otp.model.js";

const generateOtp = async (identifier) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Set expiry time to 5 minutes

  // Save OTP to the database
  await OTP.create({ identifier, otp, expiresAt });

  return otp;
};



const verifyOtp = async (identifier, otp) => {
    const otpRecord = await OTP.findOne({ identifier, otp });
  
    if (!otpRecord) {
      throw new Error("Invalid or expired OTP");
    }
  
    // OTP is valid, delete it after verification
    await OTP.deleteOne({ _id: otpRecord._id });
  
    return true;
  };

export  { generateOtp , verifyOtp};
