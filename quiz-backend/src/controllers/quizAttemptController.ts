import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { JwtUserPayload, WithJwtUserPayload } from "../types/jwt";
import {
  createAttempt,
  getAttempt,
  updateAttempt as updAttempt,
} from "../services/quizAttemptService";
import { CreateAttempt, UpdateAttempt } from "../types/quizAttempt";
import { getUserById } from "../services/userService";
import { getQuizById } from "../services/quizService";
import { QuizAttemptStatus } from "../../generated/prisma";
import { CreateAnswer, CreateAnswerRequestBody } from "../types/answer";
import { getQuestionById } from "../services/questionService";
import { createAnswer } from "../services/answerService";

interface EnrollStudentQuery extends ParsedQs {
  quizId: string;
  studentId: string;
}

export const enrollStudent: RequestHandler<
  unknown,
  unknown,
  { user: JwtUserPayload },
  EnrollStudentQuery
> = async (req, res) => {
  const { quizId, studentId } = req.query;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }
  if (!studentId) {
    return res.status(400).json({ message: "Student id not provided" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }
  const numStudentId = Number(studentId);
  if (Number.isNaN(numStudentId)) {
    return res.status(400).json({ message: "Invalid student id format" });
  }

  try {
    const student = await getUserById(numStudentId);
    if (!student || student.role !== "STUDENT") {
      return res
        .status(401)
        .json({ message: "Can not enroll another creator" });
    }
    const quiz = await getQuizById(numQuizId);
    if (!quiz || quiz.status !== "PUBLISHED") {
      return res.status(401).json({ message: "Can not enroll to this quiz" });
    }
    const attempt: CreateAttempt = {
      student_id: numStudentId,
      quiz_id: numQuizId,
      status: "ENROLLED",
      grade: null,
      start_time: null,
      end_time: null,
    };
    const createdAttempt = await createAttempt(attempt);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeStudent } = student;
    return res.status(200).json({ student: safeStudent, quiz, createdAttempt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not enroll student" });
  }
};

export const enrollSelf: RequestHandler<
  unknown,
  unknown,
  { user: JwtUserPayload }
> = async (req, res) => {
  const { quizId } = req.query;
  const user = req.body.user;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }

  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }

  try {
    const quiz = await getQuizById(numQuizId);
    if (!quiz || quiz.status !== "PUBLISHED") {
      return res.status(401).json({ message: "Can not enroll to this quiz" });
    }
    const attempt: CreateAttempt = {
      student_id: user.id,
      quiz_id: numQuizId,
      status: "ENROLLED",
      grade: null,
      start_time: null,
      end_time: null,
    };
    const createdAttempt = await createAttempt(attempt);
    return res.status(200).json({ quiz, createdAttempt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not enroll self" });
  }
};

interface UpdateStatusBody {
  status: QuizAttemptStatus;
}

interface UpdateStatusParams extends ParamsDictionary {
  quizId: string;
}

export const updateAttemptStatus: RequestHandler<
  UpdateStatusParams,
  unknown,
  WithJwtUserPayload<UpdateStatusBody>
> = async (req, res) => {
  const { status, user } = req.body;
  const { quizId } = req.params;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }
  if (!Object.values(QuizAttemptStatus).includes(status as QuizAttemptStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const attempt = await getAttempt({
      student_id: user.id,
      quiz_id: numQuizId,
    });
    if (!attempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }
    const quiz = await getQuizById(numQuizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const updatedAttempt = await updAttempt({
      student_id: user.id,
      quiz_id: numQuizId,
      status,
    });

    return res.status(200).json({ updatedAttempt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not update attempt" });
  }
};

interface UpdateAttemptBody {
  attemptUpd: UpdateAttempt;
}

interface UpdateAttemptParams extends ParamsDictionary {
  quizId: string;
}

export const updateAttempt: RequestHandler<
  UpdateAttemptParams,
  unknown,
  WithJwtUserPayload<UpdateAttemptBody>
> = async (req, res) => {
  const { attemptUpd, user } = req.body;
  const { quizId } = req.params;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }

  try {
    const attempt = await getAttempt({
      student_id: user.id,
      quiz_id: numQuizId,
    });
    if (!attempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }
    const quiz = await getQuizById(numQuizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const updatedAttempt = await updAttempt({
      ...attemptUpd,
      student_id: user.id,
      quiz_id: numQuizId,
    });

    return res.status(200).json({ updatedAttempt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not update attempt" });
  }
};

interface AnswerQuestiontParams extends ParamsDictionary {
  quizId: string;
}

export const answerQuestion: RequestHandler<
  AnswerQuestiontParams,
  unknown,
  WithJwtUserPayload<CreateAnswerRequestBody>
> = async (req, res) => {
  const { user, ...answer } = req.body;
  const { quizId } = req.params;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }
  const numQuizId = Number(quizId);
  if (Number.isNaN(numQuizId)) {
    return res.status(400).json({ message: "Invalid quiz id format" });
  }

  try {
    const attempt = await getAttempt({
      student_id: user.id,
      quiz_id: numQuizId,
    });
    if (!attempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }
    const quiz = await getQuizById(numQuizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const question = await getQuestionById(answer.question_id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const fullAnswer: CreateAnswer = {
      question_id: question.id,
      question_text: question.question_text,
      options: question.options,
      correct_options: question.correct_options,
      student_answer: answer.student_answer,
      quiz_attempt_id: attempt.id,
    };

    const createdAnswer = await createAnswer(fullAnswer);

    return res.status(200).json({ createdAnswer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not create answer" });
  }
};
