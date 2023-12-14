import { Router } from "express";
import {
  createAdvertisement,
  getAdvertisementById,
  deleteAdvertisementById,
  updateAdvertisementById,
} from "../Controller/AdvertisementController.js";

const router = Router();

router.post("/", createAdvertisement);
router.get("/:id", getAdvertisementById);
router.put("/:id", updateAdvertisementById);
router.delete("/:id", deleteAdvertisementById);

export default router;
