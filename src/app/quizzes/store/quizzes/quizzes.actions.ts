import {Action} from '@ngrx/store';
import {QuizModel} from '../../models/quiz.model';
import {QuizParams} from '../../services/quiz.service';

export enum QuizzesActionTypes {
    QuizzesRequested = '[Quizzes] Quizzes Requested',
    QuizzesLoaded = '[Quizzes] Quizzes Loaded',
    QuizzesLoadingFailed = '[Quizzes] Quizzes Loading Failed',

    QuizCreatingRequested = '[Quizzes] Quiz Creating Requested',
    QuizCreated = '[Quizzes] Quiz Created',
    QuizCreatingFailed = '[Quizzes] Quiz Creating Failed',

    QuizDeleteRequested = '[Quizzes] Quiz Delete Requested',
    QuizDeleted = '[Quizzes] Quiz Deleted',
    QuizDeleteFailed = '[Quizzes] Quiz Delete Failed',
}

export class QuizzesRequested implements Action {
    readonly type = QuizzesActionTypes.QuizzesRequested;
    constructor(public payload: { queryParams: QuizParams }) {
    }
}

export class QuizzesLoaded implements Action {
    readonly type = QuizzesActionTypes.QuizzesLoaded;

    constructor(public payload: { quizzes: Array<QuizModel> }) {
    }
}

export class QuizzesLoadingFailed implements Action {
    readonly type = QuizzesActionTypes.QuizzesLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class QuizCreatingRequested implements Action {
    readonly type = QuizzesActionTypes.QuizCreatingRequested;

    constructor(public payload: { quiz: QuizModel }) {
    }
}

export class QuizCreated implements Action {
    readonly type = QuizzesActionTypes.QuizCreated;

    constructor(public payload: { quiz: QuizModel }) {
    }
}

export class QuizCreatingFailed implements Action {
    readonly type = QuizzesActionTypes.QuizCreatingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class QuizDeleteRequested implements Action {
    readonly type = QuizzesActionTypes.QuizDeleteRequested;

    constructor(public payload: { quizId: string }) {
    }
}

export class QuizDeleted implements Action {
    readonly type = QuizzesActionTypes.QuizDeleted;

    constructor(public payload: { quizId: string }) {
    }
}

export class QuizDeleteFailed implements Action {
    readonly type = QuizzesActionTypes.QuizDeleteFailed;

    constructor(public payload: { error: any }) {
    }
}

export type QuizzesActions =
    QuizzesRequested |
    QuizzesLoaded |
    QuizzesLoadingFailed |
    QuizCreatingRequested |
    QuizCreated |
    QuizCreatingFailed |
    QuizDeleteRequested |
    QuizDeleted |
    QuizDeleteFailed;
