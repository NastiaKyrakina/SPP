import {Action} from '@ngrx/store';
import {PrivateDataModel} from '../../models/user.model';
import {AuthModel} from '../models/auth.model';

export enum AuthActionTypes {
    SignInRequested = '[Auth] Tried To Sing In',
    SignedIn = '[Auth] Successfully Signed In',
    SignInFailed = '[Auth] Failed To Sing In',

    SignedOutRequested = '[Auth] Signed Out Requested',
    SignedOut = '[Auth] Signed Out',

    CurrentUserRequested = '[Auth] Current User Requested',
    CurrentUserLoaded = '[Auth] Current User Loaded',
    CurrentUserLoadingFailed = '[Auth] Current User Loading Failed',

}

export class SignInRequested implements Action {
    readonly type = AuthActionTypes.SignInRequested;

    constructor(public payload: { data: PrivateDataModel, redirectTo: string }) {
    }
}

export class SignedIn implements Action {
    readonly type = AuthActionTypes.SignedIn;

    constructor(public payload: { authData: Partial<AuthModel> }) {
    }
}

export class SignInFailed implements Action {
    readonly type = AuthActionTypes.SignInFailed;

    constructor(public payload: { error: any }) {
    }
}

export class SignedOut implements Action {
    readonly type = AuthActionTypes.SignedOut;
}

export class SignedOutRequested implements Action {
    readonly type = AuthActionTypes.SignedOutRequested;
}

export class CurrentUserRequested implements Action {
    readonly type = AuthActionTypes.CurrentUserRequested;
}

export class CurrentUserLoaded implements Action {
    readonly type = AuthActionTypes.CurrentUserLoaded;

    constructor(public payload: { authData: AuthModel }) {
    }
}

export class CurrentUserLoadingFailed implements Action {
    readonly type = AuthActionTypes.CurrentUserLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export type AuthActions =
    SignInRequested |
    SignedIn |
    SignInFailed |
    SignedOutRequested |
    SignedOut |
    CurrentUserRequested |
    CurrentUserLoaded |
    CurrentUserLoadingFailed;
