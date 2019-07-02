import {Action} from '@ngrx/store';
import {AuthActions, AuthActionTypes, SignedIn, SignInFailed} from './auth.actions';
import {UserModel} from '../../models/user.model';
import {AuthModel} from '../models/auth.model';

export interface AuthState {
    authenticated: boolean;
    authData: Partial<AuthModel> | null;
}

export const authInitialState: AuthState = {
        authenticated: false,
        authData: null,
    };

export function authReducer(state = authInitialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.SignedIn:
            return {
                ...state,
                authenticated: true,
                authData: action.payload.authData,
            };

        case AuthActionTypes.SignedOut:
            return {
                ...state,
                authenticated: false,
                authData: null,
            };
        default:
            return state;
    }
}


