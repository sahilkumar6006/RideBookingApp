import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    addVehicle,
    updateVehicle,
    getAllVehicles,
    getVehicleById,
    deleteVehicle
} from "../controllers/admin.vehicle.controller.js";

const router = Router();

// Secure all routes with authentication and admin check
router.use(authMiddleware, isAdmin);

router.route("/")
    .post(upload.array("documents", 5), addVehicle)
    .get(getAllVehicles);

router.route("/:vehicleId")
    .get(getVehicleById)
    .patch(upload.array("documents", 5), updateVehicle)
    .delete(deleteVehicle);

export default router; 