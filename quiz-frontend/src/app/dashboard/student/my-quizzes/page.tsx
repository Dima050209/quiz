import QuizCard from "@/components/ui/quiz-card";
import { myQuizzes } from "@/lib/api-server/quiz";
import { getQueryClient } from "@/lib/get-query-client";
import { Quiz } from "@/lib/types";
import React from "react";

export default async function MyQuizzes() {
  const queryClient = getQueryClient();

  const quizzes = await queryClient.fetchQuery({
    queryKey: ["user-quizzes"],
    queryFn: myQuizzes,
  });

  console.log(quizzes)
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {" "}
      {(quizzes as Quiz[])?.map((quiz, idx) => {
        return <QuizCard key={quiz.id} quiz={quiz} />;
      })}
    </div>
  );
}
