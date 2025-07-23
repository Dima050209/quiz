import prisma from "../config/prisma";
import { CreateAttempt, UpdateAttempt } from "../types/quizAttempt";

export const createAttempt = async (attempt: CreateAttempt) => {
  return prisma.quizAttempt.create({
    data: attempt,
  });
};

type GetAttemptProps = { id: number } | { student_id: number; quiz_id: number };

export const getAttempt = async (identifier: GetAttemptProps) => {
  if ("id" in identifier) {
    return await prisma.quizAttempt.findUnique({
      where: {
        id: identifier.id,
      },
    });
  } else if ("student_id" in identifier && "quiz_id" in identifier) {
    return await prisma.quizAttempt.findUnique({
      where: {
        student_id_quiz_id: {
          student_id: identifier.student_id,
          quiz_id: identifier.quiz_id
        },
      },
    });
  }
  throw new Error("Neither attempt id or student_id + quiz_id provided");
};

export const updateAttempt = async (attempt: UpdateAttempt) => {
  console.log(attempt);
  if (attempt.id) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, student_id, quiz_id, ...data } = attempt;
    return await prisma.quizAttempt.update({
      where: {
        id,
      },
      data: data,
    });
  } else if (attempt.student_id && attempt.quiz_id) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, student_id, quiz_id, ...data } = attempt;
    return await prisma.quizAttempt.update({
      where: {
        student_id_quiz_id: {
          student_id,
          quiz_id,
        },
      },
      data: data,
    });
  }
  throw new Error("Neither attempt id or student_id + quiz_id provided");
};
