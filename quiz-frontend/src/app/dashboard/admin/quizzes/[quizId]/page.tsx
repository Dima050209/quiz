"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuiz } from "@/lib/api-client/quiz";
import { Quiz } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function QuizDetails() {
  const router = useRouter();
  const { quizId } = useParams();
  const { data, error, isPending } = useQuery<{ quiz: Quiz }>({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz(Number(quizId)),
  });

  // temporary solution because otherwise strict mode makes router.back() execute twice
  const hasNavigatedRef = useRef(false);
  useEffect(() => {
    if (error && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.back();
    }
  }, [error, router]);

  return isPending ? (
      <Card className="m-auto w-[70%] mt-10 items-center">
        <CardHeader className="h-[40px] w-[40%]">
          <Skeleton className="h-[100%] w-[100%] rounded-xl border border-gray-500/50" />
        </CardHeader>
        <CardContent className="w-[70%] flex flex-col gap-2">
          <Skeleton className="h-[25px] w-[100%] rounded-xl border border-gray-500/50" />
          <Skeleton className="h-[25px] w-[100%] rounded-xl border border-gray-500/50" />
          <Skeleton className="h-[25px] w-[70%] rounded-xl border border-gray-500/50" />
        </CardContent>
        <CardFooter className="h-[25px] w-[20%]">
          <Skeleton className="w-[100%] h-[100%] rounded-xl border border-gray-500/50" />
        </CardFooter>
      </Card>
  ) : (
    data &&
    (data.quiz as Quiz) && (
        <Card className="m-auto w-[70%] mt-10 items-center">
          <header>
            <CardTitle>{data.quiz.title}</CardTitle>
          </header>
          <CardContent><p className="text-justify">{data.quiz.description}</p></CardContent>
          <CardFooter>
            <Button>Start</Button>
          </CardFooter>
        </Card>
    )
  );
}
