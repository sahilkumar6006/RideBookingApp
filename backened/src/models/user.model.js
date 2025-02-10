import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        enum: ["RIDER", "DRIVER"],
        required: true,
    },
    profileImage: {
        type: String, // URL to image
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: String,
}, { timestamps: true });

// Add your existing p`assword and JWT methods here`