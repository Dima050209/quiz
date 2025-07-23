import prisma from "../config/prisma";
import { CreateAnswer } from "../types/answer";

export const createAnswer = async (answer: CreateAnswer) => {
    return await prisma.studentAnswer.create({
        data: answer
    })
}