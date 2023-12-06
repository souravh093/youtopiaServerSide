import { Router } from "express";
import { createComment } from "../Controller/CommentController.js";


const router = Router();

router.post("/", createComment);

export default router;
