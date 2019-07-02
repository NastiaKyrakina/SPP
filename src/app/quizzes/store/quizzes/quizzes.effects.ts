import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    QuizCreated,
    QuizCreatingRequested, QuizDeleted, QuizDeleteRequested,
    QuizzesActionTypes,
    QuizzesLoaded,
    QuizzesRequested
} from './quizzes.actions';
import {exhaustMap, map} from 'rxjs/operators';
import {QuizParams, QuizService} from '../../services/quiz.service';
import {QuizModel} from '../../models/quiz.model';

@Injectable()
export class QuizzesEffects {

    @Effect()
    QuizzesRequested$ = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizzesRequested),
            map((action: QuizzesRequested) => action.payload),
            exhaustMap(({queryParams}: {queryParams: QuizParams}) => {
                return this.quizService.getQuizzes(queryParams).pipe(
                    map(quizzes => {
                        return new QuizzesLoaded({quizzes});
                    })
                );
            })
        );

    @Effect()
    QuizCreatingRequested = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizCreatingRequested),
            map((action: QuizCreatingRequested) => action.payload),
            exhaustMap(({quiz}: {quiz: QuizModel}) => {
                return this.quizService.createQuiz(quiz).pipe(
                    map(response => {
                        return new QuizCreated({quiz: response.quiz[0]});
                    })
                );
            })
        );

    @Effect()
    QuizDeleteRequested = this.actions$
        .pipe(
            ofType(QuizzesActionTypes.QuizDeleteRequested),
            map((action: QuizDeleteRequested) => action.payload),
            exhaustMap(({quizId}: {quizId: string}) => {
                return this.quizService.deleteQuiz(quizId).pipe(
                    map(response => {
                        return new QuizDeleted({quizId: response.id});
                    })
                );
            })
        );

    constructor(private actions$: Actions,
                private quizService: QuizService) {
    }
}
