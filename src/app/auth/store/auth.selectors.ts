import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';
import {AuthModel} from '../models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.authenticated
);

export const selectAuthData = createSelector(
    selectAuthState,
    (state: AuthState) => state.authData
);

export const selectAuthenticatedToken = createSelector(
    selectAuthData,
    (authData: AuthModel) => authData ? authData.token : null
);

export const selectCurrentUser = createSelector(
    selectAuthData,
    (authData: AuthModel) => {
        return {
            _id: authData._id,
            username: authData.username,
            lastName: authData.lastName,
            firstName: authData.firstName,
            picture: authData.picture,
            role: authData.role,
        };
    }
);
