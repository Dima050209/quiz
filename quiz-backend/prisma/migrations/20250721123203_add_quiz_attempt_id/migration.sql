/*
  Warnings:

  - The primary key for the `QuizAttempt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quiz_id` on the `StudentAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `StudentAnswer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id,quiz_id]` on the table `QuizAttempt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quiz_attempt_id` to the `StudentAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentAnswer" DROP CONSTRAINT "StudentAnswer_quiz_id_student_id_fkey";

-- AlterTable
ALTER TABLE "QuizAttempt" DROP CONSTRAINT "QuizAttempt_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StudentAnswer" DROP COLUMN "quiz_id",
DROP COLUMN "student_id",
ADD COLUMN     "quiz_attempt_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QuizAttempt_student_id_quiz_id_key" ON "QuizAttempt"("student_id", "quiz_id");

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_quiz_attempt_id_fkey" FOREIGN KEY ("quiz_attempt_id") REFERENCES "QuizAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
