import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromQuizzes from './quizzes.reducer';
import {QuizzesState} from './quizzes.reducer';


export const selectQuizzesState = createFeatureSelector<fromQuizzes.QuizzesState>('quizzes');

export const selectQuizzes = createSelector(
    selectQuizzesState,
    fromQuizzes.selectAll
);

export const selectQuiz = createSelector(
    selectQuizzesState,
    (state: QuizzesState) => state.selectedQuiz
);
