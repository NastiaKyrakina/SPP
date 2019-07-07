import {Action} from '@ngrx/store';
import {QuizModel} from '../models/quiz.model';
import {QuizParams} from '../services/quiz.service';

export enum QuizzesActionTypes {
    QuizzesRequested = '[Quizzes] Quizzes Requested',
    QuizzesLoaded = '[Quizzes] Quizzes Loaded',
    QuizzesLoadingFailed = '[Quizzes] Quizzes Loading Failed',

    MyQuizzesRequested = '[Quizzes] My Quizzes Requested',
    MyQuizzesLoaded = '[Quizzes] My Quizzes Loaded',
    MyQuizzesLoadingFailed = '[Quizzes] My Quizzes Loading Failed',

    QuizRequested = '[Quiz] Quiz Requested',
    QuizLoaded = '[Quiz] Quiz Loaded',
    QuizLoadingFailed = '[Quiz] Quiz Loading Failed',

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

export class MyQuizzesRequested implements Action {
    readonly type = QuizzesActionTypes.MyQuizzesRequested;
}

export class MyQuizzesLoaded implements Action {
    readonly type = QuizzesActionTypes.MyQuizzesLoaded;

    constructor(public payload: { quizzes: Array<QuizModel> }) {
    }
}

export class MyQuizzesLoadingFailed implements Action {
    readonly type = QuizzesActionTypes.MyQuizzesLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class QuizRequested implements Action {
    readonly type = QuizzesActionTypes.QuizRequested;
    constructor(public payload: { quizId: string }) {
    }
}

export class QuizLoaded implements Action {
    readonly type = QuizzesActionTypes.QuizLoaded;

    constructor(public payload: { quiz: QuizModel }) {
    }
}

export class QuizLoadingFailed implements Action {
    readonly type = QuizzesActionTypes.QuizLoadingFailed;

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
    MyQuizzesRequested |
    MyQuizzesLoaded |
    MyQuizzesLoadingFailed |
    QuizRequested |
    QuizLoaded |
    QuizLoadingFailed |
    QuizCreatingRequested |
    QuizCreated |
    QuizCreatingFailed |
    QuizDeleteRequested |
    QuizDeleted |
    QuizDeleteFailed;
