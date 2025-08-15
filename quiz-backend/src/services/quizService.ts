import { Question } from "../../generated/prisma";
import prisma from "../config/prisma";
import { CreateQuiz, UpdateQuiz } from "../types/quiz";

export const getAllQuizzes = async () => {
  return await prisma.quiz.findMany();
}

export const getUserQuizzes = async (userId: number) => {
  const userAttempts = await prisma.quizAttempt.findMany({
    where: {
      student_id: userId
    },
    select: {
      id: true
    }
  });
  const quizIds = userAttempts.map(a => a.id);
  return await prisma.quiz.findMany({
    where: {
      id: { in: quizIds}
    }
  });
}

export const getQuizById = async (id: number) => {
  return await prisma.quiz.findUnique({
    where: {
      id
    }
  });
}

export const createQuiz = async (quiz: CreateQuiz) => {
  return await prisma.quiz.create({
    data: quiz,
  });
};

export const updateQuiz = async (quiz: UpdateQuiz) => {
  const foundQuiz = await prisma.quiz.findUnique({
    where: {
      id: quiz.id,
    },
  });
  if (!foundQuiz) {
    throw new Error("Could not update quiz. Quiz not found");
  }
  if ("creator_id" in quiz && foundQuiz.creator_id !== quiz.creator_id) {
    throw new Error("Could not update quiz. Attempt to change creator_id.");
  }
  if(quiz.newQuestions && quiz.newQuestions.length !== 0) {
    await addQuestions(quiz.id, quiz.newQuestions);
    quiz.newQuestions = undefined;
  }
  return await prisma.quiz.update({
    where: {
      id: quiz.id,
    },
    data: quiz,
  });
};

export const addQuestions = async (
  quizId: number,
  questions: Omit<Question, "id" | "quiz_id">[]
) => {
  const foundQuiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
  });
  if (!foundQuiz) {
    throw new Error("Could not update quiz. Quiz not found");
  }

  return await prisma.quiz.update({
    where: {
      id: quizId,
    },
    data: {
      questions: {
        create: questions,
      },
    },
  });
};
