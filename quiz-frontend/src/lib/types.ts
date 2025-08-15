export type QuizStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Quiz = {
  id: number;
  title: string;
  description?: string;
  timeLimit?: number; 
  status: QuizStatus;
  creatorId: number;
};

// export type Question = {
//   id: number;
//   quizId: number;
//   questionText: string;
//   options: string[];        
//   correctOptions: string[];  
// };

// export type QuizAttempt = {
//   id: number;
//   quizId: number;
//   studentId: number;
//   score?: number;
//   completedAt?: string; // ISO date
// };

export type User = {
  id: number;
  name: string;
  email: string;
  role: "STUDENT" | "CREATOR" | "ADMIN";
};
