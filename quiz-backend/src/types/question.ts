import { Question } from "../../generated/prisma";

export type UpdateQuestion = Pick<Question, "id"> & Partial<Omit<Question, "id" | "quiz_id">>;