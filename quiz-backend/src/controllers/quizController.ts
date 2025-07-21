import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { WithJwtUserPayload } from "../types/jwt";
import { CreateQuiz, RawQuiz, UpdateQuiz } from "../types/quiz";
import { createQuiz as addQuiz, getQuizById, updateQuiz as updQuiz, getAllQuizzes as allQuizzes } from "../services/quizService";
import { getQuizQuestions as quizQuestions } from "../services/questionService";

const questionsPerRequest = 5;

export const getAllQuizzes: RequestHandler = async (req, res) => {
  try {
    const quizzes = await allQuizzes();
    return res.status(200).json({quizzes});
  } catch (error) {
    console.log(error);
     return res.status(500).json({ message: "Error while retrieving quizzes" });
  }
} 

interface GetQuizParams extends ParamsDictionary{
  quizId: string;
}

export const getQuiz: RequestHandler<GetQuizParams> = async (req, res) => {
  const {quizId} = req.params;
   
  if(!quizId) {
    return res.status(400).json({ message: "Quiz id not provided" });
  }

  try {
    const quiz = await getQuizById(Number(quizId));
    if(!quiz) {
       return res.status(404).json({ message: "Quiz not found" });
    }
    return res.status(200).json({quiz});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while searching for quiz" });
  }
}


interface GetQuizQuestionsParams extends ParamsDictionary{
    quizId: string;
}

interface GetQuizQuestionsQuery {
    page?: string
}

export const getQuizQuestions: RequestHandler<GetQuizQuestionsParams, unknown, unknown, GetQuizQuestionsQuery> = async (req, res) => {
    const {quizId} = req.params;
    const {page} = req.query;
    if(!quizId) {
        return res.status(400).json({message: "Quiz id not provided"});
    }
    const numQuizId = Number(quizId);
    if(Number.isNaN(numQuizId)) {
        return res.status(400).json({message: "Invalid quiz id format"});
    }
    try {
        const numPage = !Number.isNaN(Number(page)) && (Number(page) >=  1 ? Number(page) : 1);
        const questions = numPage ? await quizQuestions(numQuizId, (numPage - 1) * questionsPerRequest, questionsPerRequest) : await quizQuestions(Number(quizId));
        return res.status(200).json({page: numPage ? numPage : undefined, questions});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Could not retrieve questions"});
    }
}

export const createQuiz: RequestHandler<unknown, unknown, WithJwtUserPayload<RawQuiz>> = async (req, res) => {
  try {
    const {user,...rawQuiz} = req.body;
    
    const quiz: CreateQuiz = {
      ...rawQuiz,
      creator_id: user.id,
      status: rawQuiz.status ?? "DRAFT"
    };

    const createdQuiz = await addQuiz(quiz);

    return res.status(201).json({ quiz: createdQuiz });

  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};


export const updateQuiz: RequestHandler<unknown, unknown, WithJwtUserPayload<UpdateQuiz>> = async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {user,...quizUpdate} = req.body;

    const quiz = await getQuizById(quizUpdate.id);
    if(!quiz) {
      return res.status(404).json({message: "Quiz not found"});
    }
    if(quiz.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(401).json({message: "Not authorized to modify quiz"});
    }
    
    const updatedQuiz = await updQuiz(quizUpdate);

    return res.status(200).json({ quiz: updatedQuiz });

  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};

interface DeleteQuizQuestionsParams extends ParamsDictionary{
    quizId: string;
}

export const deleteQuiz: RequestHandler<DeleteQuizQuestionsParams, unknown, WithJwtUserPayload<UpdateQuiz>> = async (req, res) => {
  const {quizId} = req.params;
  const {user} = req.body;
  const numQuizId = Number(quizId);
  if(Number.isNaN(numQuizId)) {
    return res.status(400).json({message: "Invalid quiz id"});
  }
  try {
    const quiz = await getQuizById(numQuizId);
    if(!quiz) {
      return res.status(404).json({message: "Quiz not found"});
    }
    if(quiz.creator_id !== user.id && user.role !== "ADMIN") {
      return res.status(401).json({message: "Not authorized to modify quiz"});
    }
    
    await updQuiz({id: numQuizId, status: "ARCHIVED"});

    return res.status(200).json({ message: "Quiz archived successfully" });

  } catch (error) {
    console.error("Create quiz error:", error);
    return res.status(500).json({ message: "Error while creating quiz" });
  }
};
