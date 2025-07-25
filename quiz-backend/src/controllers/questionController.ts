import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import {
  getQuestionById,
  updateQuestion as updQuestion,
  deleteQuestion as dltQuestion,
} from "../services/questionService";
import { WithJwtUserPayload } from "../types/jwt";
import { UpdateQuestion } from "../types/question";
import { getQuizById } from "../services/quizService";

interface GetQuestionParams extends ParamsDictionary {
  questionId: string;
}

export const getQuestion: RequestHandler<GetQuestionParams> = async (
  req,
  res
) => {
  const { questionId } = req.params;
  const numQuestionId = Number(questionId);
  if (Number.isNaN(numQuestionId)) {
    return res.status(400).json({ message: "Invalid qestion id" });
  }
  try {
    const question = await getQuestionById(numQuestionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ question });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Could not retrieve question" });
  }
};

export const getQuestionTask: RequestHandler<GetQuestionParams> = async (
  req,
  res
) => {
  const { questionId } = req.params;
  const numQuestionId = Number(questionId);
  if (Number.isNaN(numQuestionId)) {
    return res.status(400).json({ message: "Invalid qestion id" });
  }
  try {
    const question = await getQuestionById(numQuestionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { correct_options, ...data } = question;
    return res.status(200).json({ question_task: data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Could not retrieve question" });
  }
};

export const updateQuestion: RequestHandler<
  unknown,
  unknown,
  WithJwtUserPayload<UpdateQuestion>
> = async (req, res) => {
  const { user, ...data } = req.body;
  try {
    const question = await getQuestionById(data.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const questionQuiz = await getQuizById(question.quiz_id);
    if (questionQuiz?.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedQuestion = await updQuestion(data);

    return res.status(200).json({ updatedQuestion });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Could not retrieve question" });
  }
};

interface DeleteQuestionParams extends ParamsDictionary {
  questionId: string;
}

export const deleteQuestion: RequestHandler<
  DeleteQuestionParams,
  unknown,
  WithJwtUserPayload<UpdateQuestion>
> = async (req, res) => {
  const { questionId } = req.params;

  const numQuestionId = Number(questionId);
  if (Number.isNaN(numQuestionId)) {
    return res.status(400).json({ message: "Invalid question id" });
  }
  const user = req.body.user;
  try {
    const question = await getQuestionById(numQuestionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const questionQuiz = await getQuizById(question.quiz_id);
    if (questionQuiz?.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    await dltQuestion(numQuestionId);

    return res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Could not retrieve question" });
  }
};
