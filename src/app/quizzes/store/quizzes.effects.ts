import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    QuizCreated,
    QuizCreatingFailed,
    QuizCreatingRequested,
    QuizDeleted,
    QuizDeleteFailed,
    QuizDeleteRequested,
    QuizLoaded,
    QuizLoadingFailed,
    QuizRequested,
    QuizzesActionTypes,
    QuizzesLoaded,
    QuizzesLoadingFailed,
    QuizzesRequested
} from './quizzes.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {QuizParams, QuizService} from '../services/quiz.service';
import {QuizModel} from '../models/quiz.model';
import {of} from 'rxjs';
import {SignInFailed} from '../../auth/store/auth.actions';

@Injectable()
export class QuizzesEffects {

    @Effect()
    QuizzesRequested$ = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizzesRequested),
            map((action: QuizzesRequested) => action.payload),
            exhaustMap(({queryParams}: { queryParams: QuizParams }) => {
                return this.quizService.getQuizzes(queryParams).pipe(
                    map(quizzes => {
                        return new QuizzesLoaded({quizzes});
                    }),
                    catchError((error) => {
                        return of(new QuizzesLoadingFailed({error}));
                    })
                );
            })
        );

    @Effect()
    QuizRequested = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizRequested),
            map((action: QuizRequested) => action.payload),
            exhaustMap(({quizId}: { quizId: string }) => {
                return this.quizService.getQuiz(quizId).pipe(
                    map(quizzes => {
                        return new QuizLoaded({quiz: quizzes[0]});
                    }),
                    catchError((error) => {
                        return of(new QuizLoadingFailed({error}));
                    })
                );
            })
        );

    @Effect()
    QuizCreatingRequested = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizCreatingRequested),
            map((action: QuizCreatingRequested) => action.payload),
            exhaustMap(({quiz}: { quiz: QuizModel }) => {
                return this.quizService.createQuiz(quiz).pipe(
                    map(response => {
                        return new QuizCreated({quiz: response.quiz[0]});
                    }),
                    catchError((error) => {
                        return of(new QuizCreatingFailed({error}));
                    })
                );
            })
        );

    @Effect()
    QuizDeleteRequested = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizDeleteRequested),
            map((action: QuizDeleteRequested) => action.payload),
            exhaustMap(({quizId}: { quizId: string }) => {
                return this.quizService.deleteQuiz(quizId).pipe(
                    map(response => {
                        return new QuizDeleted({quizId: response.id});
                    }),
                    catchError((error) => {
                        return of(new QuizDeleteFailed({error}));
                    })
                );
            })
        );

    constructor(private actions$: Actions,
                private quizService: QuizService) {
    }
}
