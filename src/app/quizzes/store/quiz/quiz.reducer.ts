import { Action } from '@ngrx/store';
import { QuizActions, QuizActionTypes } from './quiz.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: QuizActions): State {
  switch (action.type) {

    case QuizActionTypes.LoadQuizs:
      return state;


    default:
      return state;
  }
}
