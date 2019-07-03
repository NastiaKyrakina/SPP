import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    AuthActionTypes,
    CurrentUserLoaded, CurrentUserLoadingFailed,
    CurrentUserRequested,
    SignedIn, SignedOut, SignedOutRequested,
    SignInFailed,
    SignInRequested
} from './auth.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {PrivateDataModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

    @Effect()
    SignedOutRequested$ = this.actions$
        .pipe(ofType<SignedOutRequested>(AuthActionTypes.SignedOutRequested),
            map(
                () => {
                    this.authService.logout();
                    return new SignedOut();
                }
            )
        );

    @Effect()
    SignInRequested$ = this.actions$
        .pipe(ofType<SignInRequested>(AuthActionTypes. SignInRequested),
            map((action: SignInRequested) => action.payload),
            exhaustMap(
                ({data, redirectTo}: { data: PrivateDataModel, redirectTo: string }) => {
                    return this.userService.singIn(data).pipe(
                        map((resp) => {
                            this.authService.setToken(resp.token);
                            this.authService.setId(resp._id);
                            this.router.navigateByUrl(redirectTo);

                            return new SignedIn({authData: resp});
                        }),
                        catchError((error) => {
                            return of(new SignInFailed({error}));
                        })
                    );
                }
            )
        );

    @Effect()
    CurrentUserRequested$ = this.actions$
        .pipe(ofType<CurrentUserRequested>(AuthActionTypes.CurrentUserRequested),
            exhaustMap(
                () => {
                    return this.userService.getUserBeforeInit().pipe(
                        map((authData) => {
                            return new CurrentUserLoaded({authData});
                        }),
                        catchError((error) => {
                            return of(new CurrentUserLoadingFailed({error}));
                        })
                    );
                }
            )
        );

    constructor(private actions$: Actions,
                private router: Router,
                private authService: AuthService,
                private userService: UserService) {
    }
}
