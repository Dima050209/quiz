import { Router } from "express";
import { requireRole } from "../middleware/requireRole";
import { enrollSelf, enrollStudent, updateAttempt, updateAttemptStatus } from "../controllers/quizAttemptController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post('/creator/enroll', requireRole("ADMIN","CREATOR"), enrollStudent);
router.post('/enroll', requireAuth, enrollSelf);
router.patch('/status/:quizId', requireAuth, updateAttemptStatus);
router.put('/:quizId', requireAuth, updateAttempt);

export default router;