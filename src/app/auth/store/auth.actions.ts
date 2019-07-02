import {Action} from '@ngrx/store';
import {PrivateDataModel} from '../../models/user.model';
import {AuthModel} from '../models/auth.model';

export enum AuthActionTypes {
    SignInRequested = '[Auth] Tried To Sing In',
    SignedIn = '[Auth] Successfully Signed In',
    SignInFailed = '[Auth] Failed To Sing In',
    SignedOut = '[Auth] Signed Out',
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

export type AuthActions =
    SignInRequested |
    SignedIn |
    SignInFailed |
    SignedOut;
