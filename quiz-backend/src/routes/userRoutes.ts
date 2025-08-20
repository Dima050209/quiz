import { Router } from "express";
import { currentUser, register, getUser, allUsers } from "../controllers/userController";
import { requireRole } from "../middleware/requireRole";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", requireAuth, currentUser);
router.get('/all-users', requireRole("ADMIN"), allUsers)
router.post("/register", requireRole("ADMIN"), register);
router.get('/:userId', requireAuth, getUser);

export default router;