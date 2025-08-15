import { Router } from "express";
import { requireRole } from "../middleware/requireRole";
import { answerQuestion, enrollSelf, enrollStudent, getAnswers, myAttempts, updateAttempt, updateAttemptStatus } from "../controllers/quizAttemptController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get('/', requireAuth, myAttempts);
router.post('/creator/enroll', requireRole("ADMIN","CREATOR"), enrollStudent);
router.post('/enroll', requireAuth, enrollSelf);
router.patch('/status/:quizId', requireAuth, updateAttemptStatus);
router.put('/:quizId', requireAuth, updateAttempt);
router.post('/answer/:quizId', requireAuth, answerQuestion)
router.get('/answers/:quizId', requireAuth, getAnswers)

export default router;