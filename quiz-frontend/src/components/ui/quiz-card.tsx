// "use client";
import { Quiz } from "@/lib/types";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    // const path = usePathname()
  return (
    <Link href={`/dashboard/student/quizzes/${quiz.id}`}>
      <Card
        // id={`all_quizzes_quiz_card${quiz.id}`}
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
