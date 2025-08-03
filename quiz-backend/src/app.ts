import "dotenv/config";
import express from "express";
import cors from "cors";
import logger from "morgan";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import quizRouter from "./routes/quizRoutes";
import questionRouter from "./routes/questionRoutes";
import attemptRouter from "./routes/quizAttemptRoutes";
import answerRouter from "./routes/answerRoutes";
import { redisClient } from "./config/redisClient";
import cookieParser from "cookie-parser";


(async () => {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  redisClient.on("ready", () => console.log("Redis Client started"));

  await redisClient.connect();

//   await redisClient.set("foo", "bar");
//   const result = await redisClient.get("foo");
//   console.log(result); // >>> bar
})();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/",
  })
);
app.use(logger("dev"));

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/quizzes", quizRouter);
apiRouter.use("/questions", questionRouter);
apiRouter.use("/attempts", attemptRouter);
apiRouter.use("/answer", answerRouter);

app.use("/api", apiRouter);

export default app;
