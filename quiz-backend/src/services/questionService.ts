import { Question } from "../../generated/prisma";
import prisma from "../config/prisma";

export const getQuizQuestions = async (
  quizId: number,
  start?: number,
  take?: number
) => {
  return await prisma.question.findMany({
    where: {
      quiz_id: quizId,
    },
    ...(typeof start === "number" && { skip: start }),
    ...(typeof take === "number" && { take: take }),
  });
};

export const getQuestionById = async (id: number) => {
  return await prisma.question.findUnique({
    where: {
      id,
    },
  });
};

export const updateQuestion = async (
  question: Pick<Question, "id"> & Partial<Omit<Question, "id">>
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, quiz_id, ...data } = question;
  return await prisma.question.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
};

export const deleteQuestion = async (id: number) => {
  return prisma.question.delete({ where: { id } });
};
