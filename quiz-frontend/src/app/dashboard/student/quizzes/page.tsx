import QuizCard from "@/components/ui/quiz-card";
import { allQuizzes } from "@/lib/api-server/quiz";
import { getQueryClient } from "@/lib/get-query-client";
import { Quiz } from "@/lib/types";

export default async function Quizzes() {
  const queryClient = getQueryClient();

  const quizzes = await queryClient.fetchQuery({
    queryKey: ["quizzes"],
    queryFn: allQuizzes
  })

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {(quizzes as Quiz[])?.map((quiz, idx) => {
        return <QuizCard key={quiz.id} quiz={quiz}/>;
      })}
    </div>
  );
}
