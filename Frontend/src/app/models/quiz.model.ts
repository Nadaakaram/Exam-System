export interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
  icon?: string;
  score?: number;
}

export interface Question {
//   _id?: string;
  questionText: string;
  options: { optionText: string; isCorrect: boolean }[];
  correctAnswer: number;
}

export interface Result {
  userId: string;
  quizId: string;
  score: number;
  answers: { questionId: string, answer: number }[];
}