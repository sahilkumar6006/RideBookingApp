import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vehicle } from "../models/vehicle.model.js";

const addVehicle = asyncHandler(async (req, res) => {
    const {
        driver,
        vehicleType,
        model,
        licensePlate,
    } = req.body;

    if (!driver || !vehicleType || !model || !licensePlate) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if vehicle with same license plate exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
        throw new ApiError(409, "Vehicle with this license plate already exists");
    }

    // Upload documents if provided
    let documents = [];
    if (req.files && req.files.length > 0) {
        documents = await Promise.all(
            req.files.map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return result.secure_url;
            })
        );
    }

    const vehicle = await Vehicle.create({
        driver,
        vehicleType,
        model,
        licensePlate,
        documents,
        isVerified: true // Admin-added vehicles are automatically verified
    });

    return res.status(201).json(
        new ApiResponse(201, vehicle, "Vehicle added successfully")
    );
});

const updateVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;
    const {
        vehicleType,
        model,
        licensePlate,
        isVerified
    } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found");
    }

    // Update fields if provided
    if (vehicleType) vehicle.vehicleType = vehicleType;
    if (model) vehicle.model = model;
    if (licensePlate) vehicle.licensePlate = licensePlate;
    if (typeof isVerified === 'boolean') vehicle.isVerified = isVerified;

    // Handle new documents if provided
    if (req.files && req.files.length > 0) {
        const newDocuments = await Promise.all(
            req.files.map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return result.secure_url;
            })
        );
        vehicle.documents = [...vehicle.documents, ...newDocuments];
    }

    await vehicle.save();

    return res.status(200).json(
        new ApiResponse(200, vehicle, "Vehicle updated successfully")
    );
});

const getAllVehicles = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, verified } = req.query;

    const query = {};
    if (typeof verified !== 'undefined') {
        query.isVerified = verified === 'true';
    }

    const vehicles = await Vehicle.find(query)
        .populate('driver', 'fullName email phone')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            vehicles,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalVehicles: total
            }
        }, "Vehicles retrieved successfully")
    );
});

const getVehicleById = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findById(vehicleId)
        .populate('driver', 'fullName email phone');

    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found");
    }

    return res.status(200).json(
        new ApiResponse(200, vehicle, "Vehicle retrieved successfully")
    );
});

const deleteVehicle = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;

    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicle) {
        throw new ApiError(404, "Vehicle not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Vehicle deleted successfully")
    );
});

export {
    addVehicle,
    updateVehicle,
    getAllVehicles,
    getVehicleById,
    deleteVehicle
}; 