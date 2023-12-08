import { Router } from "express";
import {
  createNews,
  deleteNewsById,
  getAllNews,
  getLatestNews,
  getNewsAll,
  getNewsAllWithPagination,
  getNewsByCategory,
  getNewsById,
  getSportNews,
  updateNewsById,
} from "../Controller/NewsController.js";

const router = Router();

router.post("/", createNews);
router.get("/", getAllNews);
router.get("/all", getNewsAll);
router.get("/all?take=4?skip=4", getNewsAllWithPagination);
router.get("/recentNews", getLatestNews)
router.get("/:id", getNewsById);
router.get("/categories/:id/:category", getNewsByCategory)
router.get("/sportsNews", getSportNews)
router.put("/:id", updateNewsById);
router.delete("/:id", deleteNewsById);


export default router;
