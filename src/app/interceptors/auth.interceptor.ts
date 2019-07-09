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
import {CONFIRM, PopupService, TOAST} from '../core/popup.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    errorHanding = (errorResponse: HttpErrorResponse) => {
        const clonedError = {...errorResponse};
        const status = clonedError.status;
        let message: string;
        message = clonedError.message;
        if (status === 401) {
            message = 'Invalid password or username';
        }

        this.popUpService.confirm({
            type: TOAST,
            data: {
                text: message,
                type: 'error'
                ,
            }
        });
        return throwError(errorResponse);
    };

    constructor(private authService: AuthService,
                private popUpService: PopupService) {

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

