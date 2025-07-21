/*
  Warnings:

  - You are about to drop the `StudentQuiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QuizAttemptStatus" AS ENUM ('ENROLLED', 'IN_PROGRESS', 'SUBMITTED', 'GRADED', 'PASSED', 'FAILED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "StudentAnswer" DROP CONSTRAINT "StudentAnswer_quiz_id_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentQuiz" DROP CONSTRAINT "StudentQuiz_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentQuiz" DROP CONSTRAINT "StudentQuiz_student_id_fkey";

-- DropTable
DROP TABLE "StudentQuiz";

-- DropEnum
DROP TYPE "StudentQuizStatus";

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "student_id" INTEGER NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "status" "QuizAttemptStatus" NOT NULL DEFAULT 'ENROLLED',
    "grade" INTEGER,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("student_id","quiz_id")
);

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_quiz_id_student_id_fkey" FOREIGN KEY ("quiz_id", "student_id") REFERENCES "QuizAttempt"("quiz_id", "student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
