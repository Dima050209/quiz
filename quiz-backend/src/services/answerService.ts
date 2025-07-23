import prisma from "../config/prisma";
import { CreateAnswer } from "../types/answer";

export const createAnswer = async (answer: CreateAnswer) => {
    return await prisma.studentAnswer.create({
        data: answer
    })
}

export const getAttemptAnswers = async (attemptId: number) => {
    return await prisma.studentAnswer.findMany({
        where: {
            quiz_attempt_id: attemptId
        }
    })
}