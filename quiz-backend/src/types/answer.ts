import { StudentAnswer } from "../../generated/prisma";

export type CreateAnswerRequestBody = Omit<StudentAnswer, "id" | "quiz_attempt_id" | "options" | "correct_options" | "question_text">;
export type CreateAnswer = Omit<StudentAnswer, "id">;