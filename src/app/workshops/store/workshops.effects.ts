import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    UsersLoaded,
    UsersRequested,
    WorkshopCommentsLoaded,
    WorkshopCommentsRequested, WorkshopLoaded,
    WorkshopRequested,
    WorkshopsActionTypes
} from './workshops.actions';
import {concatMapTo, exhaustMap, map} from 'rxjs/operators';
import {QuizzesLoaded, QuizzesRequested} from '../../quizzes/store/quizzes.actions';
import {QuizParams} from '../../quizzes/services/quiz.service';
import {WorkshopService} from '../services/workshop.service';
import {CommentService} from '../../services/comment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';

@Injectable()
export class WorkshopsEffects {

    @Effect()
    WorkshopRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopRequested),
            map((action: WorkshopRequested) => action.payload),
            exhaustMap(({workshopId}: { workshopId: string }) => {
                return this.workshopService.getWorkshop(workshopId).pipe(
                    map(workshop => {
                        return new WorkshopLoaded({workshop});
                    })
                );
            }));

    @Effect()
    WorkshopCommentsRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopCommentsRequested),
            map((action: WorkshopCommentsRequested) => action.payload),
            exhaustMap(({workshopId}: { workshopId: string }) => {
                return this.commentsService.getWrkComments(workshopId).pipe(
                    map(comments => {
                        console.log(comments);
                        const commentsAuthors = comments.map(comment => comment._author);
                        this.store.dispatch(new UsersRequested({usersIds: commentsAuthors}));
                        return new WorkshopCommentsLoaded({comments});
                    })
                );
            }));

    @Effect()
    UsersRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.UsersRequested),
            map((action: UsersRequested) => action.payload),
            exhaustMap(({usersIds}: { usersIds: string[] }) => {
                return this.commentsService.getUsersByIds(usersIds).pipe(
                    map(users => {
                        console.log(users);
                        return new UsersLoaded({users});
                    })
                );
            }));

    constructor(private actions$: Actions,
                private workshopService: WorkshopService,
                private commentsService: CommentService,
                private store: Store<AppState>) {
    }
}
