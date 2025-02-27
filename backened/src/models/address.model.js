// models/Address.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: ["Home", "Work", "Other"],
      default: "Other",
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      default: "United States",
      trim: true,
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isFrequentlyUsed: {
      type: Boolean,
      default: false,
    },
    lastUsed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for geospatial queries
addressSchema.index({ coordinates: "2dsphere" });

// Create index for user queries
addressSchema.index({ user: 1 });

module.exports = mongoose.model("Address", addressSchema);
