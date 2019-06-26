export interface AnswersModel {
    answer: string;
    isCorrect: boolean;
}

export interface QuestionModel {
    question: string;
    questionType: string;
    correctAnswer: string;
    answerVariants?: Array<AnswersModel>;
}

export interface QuizModel {
    id: string;
    author: string;
    posts: string[];
    status?: 'draft' | 'published';
    name?: string;
    questions: Array<QuestionModel>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ResultModel {
    message: string;
    results: boolean[];
}
