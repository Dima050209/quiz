import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { JwtUser } from "../types/jwt";
import { getAnswerById } from "../services/answerService";
import { getAttempt } from "../services/quizAttemptService";

interface GetAnswerParams extends ParamsDictionary {
  answerId: string;
}

export const getAnswer: RequestHandler<
  GetAnswerParams,
  unknown,
  { user: JwtUser }
> = async (req, res) => {
  const { user } = req.body;
  const { answerId } = req.params;

  if (!answerId) {
    return res.status(400).json({ message: "Answer id not provided" });
  }
  const numAnswerId = Number(answerId);
  if (Number.isNaN(numAnswerId)) {
    return res.status(400).json({ message: "Invalid Answer id format" });
  }

  try {
    const answer = await getAnswerById(numAnswerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    const quizAttempt = await getAttempt({ id: answer.quiz_attempt_id });
    if (!quizAttempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }
    if (
      quizAttempt.student_id !== user.id &&
      user.role !== "ADMIN" &&
      user.role !== "CREATOR"
    ) {
      return res.status(401).json({ message: "Access denied" });
    }
    return res.status(200).json({answer});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not find answer" });
  }
};
