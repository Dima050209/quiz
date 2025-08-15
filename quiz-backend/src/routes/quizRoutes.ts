import { Router } from "express";
import { requireRole } from "../middleware/requireRole";
import { createQuiz, getQuiz, updateQuiz, getQuizQuestions, getAllQuizzes, deleteQuiz, getMyQuizzes } from "../controllers/quizController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get('/', requireAuth, getAllQuizzes)
router.get('/my-quizzes', requireAuth, getMyQuizzes)
router.get('/:quizId', requireAuth, getQuiz);
router.get('/:quizId/questions', requireAuth, getQuizQuestions);
router.post('/', requireRole("CREATOR", "ADMIN"), createQuiz);
router.put('/', requireRole("CREATOR", "ADMIN"), updateQuiz);
router.delete('/:quizId', requireRole("CREATOR", "ADMIN"), deleteQuiz)

export default router;