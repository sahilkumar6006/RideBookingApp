import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ["SEDAN", "SUV", "HATCHBACK"],
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
    },
    documents: [{
        type: String, // URLs to vehicle documents
    }],
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);