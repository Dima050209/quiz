import { Quiz } from "@/lib/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Link from "next/link";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link href={`/dashboard/student/quizzes/${quiz.id}`}>
      <Card
        key={quiz.id}
        className="w-50 min-h-40 hover:scale-110 duration-200"
      >
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[70%]">
          <p className="text-sm line-clamp-2">{quiz.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
