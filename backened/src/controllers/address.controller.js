import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.model.js";
import { geocodingService } from "../services/geocodingService.js";

const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        addresses,
        count: addresses.length,
      },
      "Addresses retrieved successfully"
    )
  );
});

const getFavoriteAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({
    user: req.user._id,
    isFavorite: true,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        addresses,
        count: addresses.length,
      },
      "Favorite addresses retrieved successfully"
    )
  );
});

const getAddressById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const address = await Address.findById(id);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Check if address belongs to user
  if (address.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to access this address");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, address, "Address retrieved successfully"));
});

const createAddress = asyncHandler(async (req, res) => {
  const { street, city, state, zipCode, country, label } = req.body;

  // Validate required fields
  if (!street || !city || !state || !zipCode) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Get coordinates from geocoding service
  const fullAddress = `${street}, ${city}, ${state} ${zipCode}, ${country || ""}`;
  const geoData = await geocodingService.geocodeAddress(fullAddress);

  if (!geoData.success) {
    throw new ApiError(400, "Could not geocode address");
  }

  // Create address
  const address = await Address.create({
    user: req.user._id,
    street,
    city,
    state,
    zipCode,
    country: country || "United States",
    label: label || "Other",
    coordinates: {
      type: "Point",
      coordinates: [geoData.longitude, geoData.latitude],
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, address, "Address created successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { street, city, state, zipCode, country, label, isFavorite } = req.body;

  const address = await Address.findById(id);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Check if address belongs to user
  if (address.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this address");
  }

  // Check if we need to update coordinates
  if (street || city || state || zipCode || country) {
    const updatedStreet = street || address.street;
    const updatedCity = city || address.city;
    const updatedState = state || address.state;
    const updatedZipCode = zipCode || address.zipCode;
    const updatedCountry = country || address.country;

    // Get coordinates from geocoding service
    const fullAddress = `${updatedStreet}, ${updatedCity}, ${updatedState} ${updatedZipCode}, ${updatedCountry}`;
    const geoData = await geocodingService.geocodeAddress(fullAddress);

    if (!geoData.success) {
      throw new ApiError(400, "Could not geocode address");
    }

    address.street = updatedStreet;
    address.city = updatedCity;
    address.state = updatedState;
    address.zipCode = updatedZipCode;
    address.country = updatedCountry;
    address.coordinates = {
      type: "Point",
      coordinates: [geoData.longitude, geoData.latitude],
    };
  }

  // Update other fields if provided
  if (label) address.label = label;
  if (isFavorite !== undefined) address.isFavorite = isFavorite;

  await address.save();

  return res
    .status(200)
    .json(new ApiResponse(200, address, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const address = await Address.findById(id);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Check if address belongs to user
  if (address.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this address");
  }

  await Address.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Address deleted successfully"));
});

const markAddressAsUsed = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const address = await Address.findById(id);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  // Check if address belongs to user
  if (address.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to use this address");
  }

  // Update lastUsed timestamp
  address.lastUsed = Date.now();

  // Check if this address has been used frequently
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Count recent uses of this address
  const recentUses = await Address.countDocuments({
    _id: address._id,
    lastUsed: { $gte: oneMonthAgo },
  });

  // If used more than 3 times in the last month, mark as frequently used
  if (recentUses >= 3) {
    address.isFrequentlyUsed = true;
  }

  await address.save();

  return res
    .status(200)
    .json(new ApiResponse(200, address, "Address marked as used successfully"));
});

const getFrequentAddresses = asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;

  const addresses = await Address.find({
    user: req.user._id,
    isFrequentlyUsed: true,
  })
    .sort({ lastUsed: -1 })
    .limit(Number(limit));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        addresses,
        count: addresses.length,
      },
      "Frequent addresses retrieved successfully"
    )
  );
});

export {
  getAddresses,
  getFavoriteAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  markAddressAsUsed,
  getFrequentAddresses,
};
