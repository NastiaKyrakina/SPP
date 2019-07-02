import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {authReducer, AuthState} from '../auth/store/auth.reducer';
import {quizzesReducer, QuizzesState} from '../quizzes/store/quizzes.reducer';
import {workshopsReducer, WorkshopsState} from '../workshops/store/workshops.reducer';

export interface AppState {
    auth: AuthState;
    quizzes: QuizzesState;
    workshops: WorkshopsState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    quizzes: quizzesReducer,
    workshops: workshopsReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
