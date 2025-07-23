import { QuizAttempt } from "../../generated/prisma";

export type CreateAttempt = Omit<QuizAttempt, "id">;

export type UpdateAttempt = Partial<QuizAttempt>;