import { Router } from "express";
import { currentUser, register, getUser } from "../controllers/userController";
import { requireRole } from "../middleware/requireRole";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", requireAuth, currentUser);
router.post("/register", requireRole("ADMIN"), register);
router.get('/:userId', requireAuth, getUser);

export default router;