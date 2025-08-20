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

export default function QuizModal() {
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
    <Modal>
      <Card className="bg-white/70">
        <CardHeader>
          <Skeleton className="h-[25px] w-[70%] rounded-xl" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-[25px] w-[80%] rounded-xl" />
          <Skeleton className="h-[25px] w-[80%] rounded-xl" />
          <Skeleton className="h-[25px] w-[60%] rounded-xl" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-[25px] w-[40%] rounded-xl" />
        </CardFooter>
      </Card>
    </Modal>
  ) : (
    data &&
    (data.quiz as Quiz) && (
      <Modal>
        <Card>
          <CardHeader>
            <CardTitle>{data.quiz.title}</CardTitle>
          </CardHeader>
          <CardContent className="max-h-100 overflow-y-auto">{data.quiz.description}</CardContent>
          <CardFooter>
            <Button>Start</Button>
          </CardFooter>
        </Card>
      </Modal>
    )
  );
}
