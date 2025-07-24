import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getAnswer } from "../controllers/answerController";

const router = Router();

router.get('/:answerId', requireAuth, getAnswer);

export default router;