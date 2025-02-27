import { Router } from "express";
import {
  getAddresses,
  getFavoriteAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
  markAddressAsUsed,
  getFrequentAddresses,
} from "../controllers/address.controller.js";

router.get("/", getAddresses);
router.get("/favorites", getFavoriteAddresses);
router.get("/frequent", getFrequentAddresses);
router.get("/:id", getAddressById);

router.post("/", createAddress);

// Put/patch routes
router.put("/:id", updateAddress);
router.patch("/:id/use", markAddressAsUsed);

// Delete routes
router.delete("/:id", deleteAddress);

export default router;
