import { Router } from "express";
import { createRole, deleteAllRoles, getAllRoles } from "../Controller/RoleController.js";

const router = Router();

router.post("/", createRole);
router.get("/", getAllRoles)
// router.get("/:id", getUserById)
// router.put("/:id", updateUserById)
// router.delete("/:id", deleteUserById)
router.delete("/", deleteAllRoles)

export default router;
