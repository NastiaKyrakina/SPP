import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {WorkshopCommentsDeleting} from '../workshops/store/workshops.actions';
import {ConfirmPopupService} from '../core/confirm-popup.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    errorHanding = (errorResponse: HttpErrorResponse) => {
        const clonedError = {...errorResponse};
        const status = clonedError.status;
        this.popUpService.confirm({
            hasBackdrop: false,
            data: {
                title: `Ops! ${status} error`,
                text: errorResponse.error.message,
                confirmButton: '',
                cancelButton: 'Ok',
            }
        });
        return throwError(errorResponse);
    }

    constructor(private authService: AuthService,
                private popUpService: ConfirmPopupService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        const token = this.authService.getToken();
        request = req.clone({headers: req.headers.append('Content-Type', 'application/json')});
        if (token) {
            request = request.clone({headers: req.headers.append('Authorization', `Bearer ${token}`)});
        }
        return next.handle(request).pipe(
            catchError(this.errorHanding)
        );
    }


}

