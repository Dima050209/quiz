import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import QuizCard from "@/components/ui/quiz-card";
import { allQuizzes } from "@/lib/api-server/quiz";
import { getQueryClient } from "@/lib/get-query-client";
import { Quiz } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const mockQuizzes = {
  data: {
    quizzes: [
      {
        id: 1,
        title: "Math Basics",
        description: "Test your knowledge on basic arithmetic and numbers.",
        timeLimit: 600,
        status: "published",
        creatorId: 5
      },
      {
        id: 2,
        title: "World Capitals",
        description: "Identify the capitals of various countries.",
        timeLimit: 900,
        status: "draft",
        creatorId: 6
      },
      {
        id: 3,
        title: "Science Trivia",
        description: "A mix of biology, chemistry, and physics questions.",
        timeLimit: 1200,
        status: "published",
        creatorId: 5
      },
      {
        id: 4,
        title: "History Facts",
        description: "Test your knowledge of important historical events.",
        timeLimit: 800,
        status: "archived",
        creatorId: 6
      },
      {
        id: 5,
        title: "Programming Basics",
        description: "Questions on fundamental programming concepts.",
        timeLimit: 1000,
        status: "published",
        creatorId: 5
      },
      {
        id: 6,
        title: "English Vocabulary",
        description: "Improve your vocabulary with this quiz.",
        timeLimit: 700,
        status: "draft",
        creatorId: 6
      },
      {
        id: 7,
        title: "Sports Rules",
        description: "How well do you know the rules of popular sports?",
        timeLimit: 750,
        status: "published",
        creatorId: 5
      },
      {
        id: 8,
        title: "Music Theory",
        description: "Quiz on notes, scales, and musical terms.",
        timeLimit: 600,
        status: "published",
        creatorId: 6
      },
      {
        id: 9,
        title: "Geography Challenge",
        description: "Test your knowledge of countries, rivers, and mountains.",
        timeLimit: 900,
        status: "archived",
        creatorId: 5
      },
      {
        id: 10,
        title: "Art History",
        description: "Questions on famous artworks and artists.",
        timeLimit: 1100,
        status: "published",
        creatorId: 6
      },
      {
        id: 11,
        title: "Advanced Math",
        description: "Challenging problems for math lovers.",
        timeLimit: 1500,
        status: "draft",
        creatorId: 5
      },
      {
        id: 12,
        title: "Physics Fundamentals",
        description: "Covers Newton's laws, motion, and energy.",
        timeLimit: 1300,
        status: "published",
        creatorId: 6
      },
      {
        id: 13,
        title: "Chemistry Basics",
        description: "Elements, compounds, and reactions.",
        timeLimit: 1000,
        status: "published",
        creatorId: 5
      },
      {
        id: 14,
        title: "Literature Quiz",
        description: "Questions on novels, poetry, and authors.",
        timeLimit: 900,
        status: "archived",
        creatorId: 6
      },
      {
        id: 15,
        title: "Space Exploration",
        description: "How much do you know about space missions?",
        timeLimit: 1200,
        status: "draft",
        creatorId: 5
      },
      {
        id: 16,
        title: "Computer Science",
        description: "From algorithms to data structures.",
        timeLimit: 1000,
        status: "published",
        creatorId: 6
      },
      {
        id: 17,
        title: "Environmental Science",
        description: "Covers ecosystems, climate change, and sustainability.Covers ecosystems, climate change, and sustainability.Covers ecosystems, climate change, and sustainability.Covers ecosystems, climate change, and sustainability.",
        timeLimit: 1100,
        status: "published",
        creatorId: 5
      },
      {
        id: 18,
        title: "Medical Knowledge",
        description: "Basic human anatomy and common medical terms.",
        timeLimit: 950,
        status: "archived",
        creatorId: 6
      },
      {
        id: 19,
        title: "Business Management",
        description: "Leadership, strategy, and marketing concepts.",
        timeLimit: 800,
        status: "published",
        creatorId: 5
      },
      {
        id: 20,
        title: "Pop Culture",
        description: "Movies, TV, and music from the past decades.",
        timeLimit: 700,
        status: "draft",
        creatorId: 6
      }
    ]
  }
};

export default async function Quizzes() {
  // let quizzes;
  // try {
  //   quizzes = await axios.get(`${CLIENT_BASE_URL}/api/quiz`);
  // } catch (error) {}
  // if (!quizzes) {
  //   const cookieStore = await cookies();
  //   const cookieHeader = cookieStore
  //     .getAll()
  //     .map(({ name, value }) => `${name}=${value}`)
  //     .join("; ");
  //   console.log("refresh");
  //   console.log('header', cookieHeader)
  //   await axios.get(`${CLIENT_BASE_URL}/api/auth/refresh`, {
  //     headers: {
  //       cookie: cookieHeader,
  //     },
  //     withCredentials: true,
  //   });
  //   quizzes = await axios.get(`${CLIENT_BASE_URL}/api/quiz`);
  // }


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
