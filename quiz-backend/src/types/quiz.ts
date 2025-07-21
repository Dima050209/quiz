import { Question, Quiz } from "../../generated/prisma";
import { MakeOptional } from "./customUtilityTypes";

export type RawQuiz = MakeOptional<Omit<Quiz, "id" | "creator_id">, "status">;

export type CreateQuiz = Omit<Quiz, "id">;

export type UpdateQuiz = Pick<Quiz, "id"> & Partial<Omit<Quiz, "id" | "creator_id"> & {newQuestions: Question[]}>;

export const includesStatus = (quiz: Partial<Quiz>): quiz is Omit<Quiz, "id"> => {
    return Object.keys(quiz).includes("status");
}