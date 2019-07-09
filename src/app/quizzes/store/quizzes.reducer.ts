import {Action} from '@ngrx/store';
import {QuizzesActions, QuizzesActionTypes, QuizzesRequested} from './quizzes.actions';
import {QuizModel} from '../models/quiz.model';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const adapter: EntityAdapter<QuizModel> = createEntityAdapter<QuizModel>();

export interface QuizzesState extends EntityState<QuizModel> {
    selectedQuiz: QuizModel | null;
}

export const quizzesInitialState: QuizzesState = adapter.getInitialState({
    selectedQuiz: null,
});

export function quizzesReducer(state = quizzesInitialState, action: QuizzesActions): QuizzesState {
    switch (action.type) {

        case QuizzesActionTypes.QuizzesLoaded:
            // @ts-ignore
            return adapter.addAll(action.payload.quizzes, state);

        case QuizzesActionTypes.MyQuizzesLoaded:
            // @ts-ignore
            return adapter.addAll(action.payload.quizzes, state);

        case QuizzesActionTypes.QuizLoaded: {// @ts-ignore
            return {
                ...state,
                selectedQuiz: action.payload.quiz};
        }

        case QuizzesActionTypes.QuizCreated:
            // @ts-ignore
            return adapter.addOne(action.payload.quiz, state);

        case QuizzesActionTypes.QuizDeleted:
            // @ts-ignore
            return adapter.removeOne(action.payload.quizId, state);

        default:
            return state;
    }
}

export const {
    selectAll,
} = adapter.getSelectors();
