import { RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { CreateQuiz, RawQuiz, UpdateQuiz } from "../types/quiz";
import {
  createQuiz as addQuiz,
  getQuizById,
  updateQuiz as updQuiz,
  getAllQuizzes as allQuizzes,
  getUserQuizzes,
} from "../services/quizService";
import { getQuizQuestions as quizQuestions } from "../services/questionService";
import { RequestWithUser } from "../middleware/requireAuth";

const questionsPerRequest = 5;

export const getAllQuizzes: RequestHandler = async (req, res) => {
  try {
    const quizzes = await allQuizzes();
    return res.status(200).json({ quizzes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while retrieving quizzes" });
  }
};

export const getMyQuizzes = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const quizzes = await getUserQuizzes(user.id);
    return res.status(200).json({ quizzes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while retrieving quizzes" });
  }
};

interface GetQuizParams extends ParamsDictionary {
  quizId: string;
}

export const getQuiz: RequestHandler<GetQuizParams> = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }

  try {
    const quiz = await getQuizById(Number(quizId));
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    return res.status(200).json({ quiz });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while searching for quiz" });
  }
};

interface GetQuizQuestionsParams extends ParamsDictionary {
  quizId: string;
}

interface GetQuizQuestionsQuery {
  page?: string;
}

export const getQuizQuestions: RequestHandler<
  GetQuizQuestionsParams,
  unknown,
  unknown,
  GetQuizQuestionsQuery
> = async (req, res) => {
  const { quizId } = req.params;
  const { page } = req.query;
  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }
  try {
    const numPage =
      !Number.isNaN(Number(page)) && (Number(page) >= 1 ? Number(page) : 1);
    const questions = numPage
      ? await quizQuestions(
          numQuizId,
          (numPage - 1) * questionsPerRequest,
          questionsPerRequest
        )
      : await quizQuestions(Number(quizId));
    return res
      .status(200)
      .json({ page: numPage ? numPage : undefined, questions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not retrieve questions" });
  }
};

export const createQuiz = async (
  req: RequestWithUser<unknown, unknown, RawQuiz>,
  res: Response
) => {
  try {
    const { ...rawQuiz } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const quiz: CreateQuiz = {
      ...rawQuiz,
      creator_id: user.id,
      status: rawQuiz.status ?? "DRAFT",
    };

    const createdQuiz = await addQuiz(quiz);

    return res.status(201).json({ quiz: createdQuiz });
  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};

export const updateQuiz = async (
  req: RequestWithUser<unknown, unknown, UpdateQuiz>,
  res: Response
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ...quizUpdate } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const quiz = await getQuizById(quizUpdate.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (quiz.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(401).json({ message: "Not authorized to modify quiz" });
    }

    const updatedQuiz = await updQuiz(quizUpdate);

    return res.status(200).json({ quiz: updatedQuiz });
  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};

interface DeleteQuizQuestionsParams extends ParamsDictionary {
  quizId: string;
}

export const deleteQuiz = async (
  req: RequestWithUser<DeleteQuizQuestionsParams>,
  res: Response
) => {
  const { quizId } = req.params;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id" });
  }
  try {
    const quiz = await getQuizById(numQuizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (quiz.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(401).json({ message: "Not authorized to modify quiz" });
    }

    await updQuiz({ id: numQuizId, status: "ARCHIVED" });

    return res.status(200).json({ message: "Quiz archived successfully" });
  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};
