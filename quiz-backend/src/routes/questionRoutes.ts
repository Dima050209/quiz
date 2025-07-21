import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { deleteQuestion, getQuestion, getQuestionTask, updateQuestion } from "../controllers/questionController";
import { requireRole } from "../middleware/requireRole";

const router = Router();

router.get('/:questionId', requireAuth, getQuestion);
router.get('/task/:questionId', requireAuth, getQuestionTask);
router.put("/", requireRole("CREATOR", "ADMIN"), updateQuestion);
router.delete('/:questionId', requireRole("CREATOR", "ADMIN"), deleteQuestion)

export default router;