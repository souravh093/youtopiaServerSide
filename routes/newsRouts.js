import { Router } from "express";
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
  updateNewsById,
} from "../Controller/NewsController.js";

const router = Router();

router.post("/", createNews);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", updateNewsById);
router.delete("/:id", deleteNewsById);

export default router;
