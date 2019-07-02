import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {authReducer, AuthState} from '../auth/store/auth.reducer';
import {quizzesReducer, QuizzesState} from '../quizzes/store/quizzes/quizzes.reducer';

export interface AppState {
    auth: AuthState;
    quizzes: QuizzesState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    quizzes: quizzesReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
