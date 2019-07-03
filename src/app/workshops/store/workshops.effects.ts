import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    TagsLoaded,
    TagsLoadingFailed,
    TagsRequested,
    UsersLoaded,
    UsersLoadingFailed,
    UsersRequested,
    WorkshopCommentsCreated,
    WorkshopCommentsCreating,
    WorkshopCommentsCreatingFailed, WorkshopCommentsDeleted, WorkshopCommentsDeleting, WorkshopCommentsDeletingFailed,
    WorkshopCommentsLoaded,
    WorkshopCommentsLoadingFailed,
    WorkshopCommentsRequested,
    WorkshopCommentsUpdated, WorkshopCommentsUpdating,
    WorkshopCommentsUpdatingFailed,
    WorkshopLoaded,
    WorkshopLoadingFailed,
    WorkshopRequested,
    WorkshopsActionTypes,
    WorkshopsLoaded,
    WorkshopsLoadingFailed,
    WorkshopsRequested
} from './workshops.actions';
import {catchError, concatMapTo, exhaustMap, map} from 'rxjs/operators';
import {WorkshopService} from '../services/workshop.service';
import {CommentService} from '../../services/comment.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {TagsService} from '../../services/tags.service';
import {of} from 'rxjs';
import {CommentModel} from '../../models/workshop.model';

@Injectable()
export class WorkshopsEffects {

    @Effect()
    WorkshopsRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopsRequested),
            map((action: WorkshopsRequested) => action.payload),
            exhaustMap(({page, tags, category}:
                            {
                                page?: string
                                category?: string
                                tags?: string;
                            }) => {
                return this.workshopService.filterWorkshops(tags, category, page).pipe(
                    map(workshops => {
                        return new WorkshopsLoaded({workshops});
                    }),
                    catchError((error) => {
                        return of(new WorkshopsLoadingFailed({error}));
                    })
                );
            }));

    @Effect()
    WorkshopRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopRequested),
            map((action: WorkshopRequested) => action.payload),
            exhaustMap(({workshopId}: { workshopId: string }) => {
                return this.workshopService.getWorkshop(workshopId).pipe(
                    map(workshop => {
                        return new WorkshopLoaded({workshop});
                    }),
                    catchError((error) => {
                        return of(new WorkshopLoadingFailed({error}));
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
                        const commentsAuthors = comments.map(comment => comment._author);
                        this.store.dispatch(new UsersRequested({usersIds: commentsAuthors}));
                        return new WorkshopCommentsLoaded({comments});
                    }),
                    catchError((error) => {
                        return of(new WorkshopCommentsLoadingFailed({error}));
                    })
                );
            }));

    @Effect()
    WorkshopCommentsCreating$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopCommentsCreating),
            map((action: WorkshopCommentsCreating) => action.payload),
            exhaustMap(({workshopId, comment}: { workshopId: string, comment: string }) => {
                return this.commentsService.createComment(workshopId, comment).pipe(
                    map(newComment => {
                        return new WorkshopCommentsCreated({comment: newComment.comment});
                    }),
                    catchError((error) => {
                        return of(new WorkshopCommentsCreatingFailed({error}));
                    })
                );
            }));

    @Effect()
    WorkshopCommentsUpdating$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopCommentsUpdating),
            map((action: WorkshopCommentsUpdating) => action.payload),
            exhaustMap(({workshopId, commentId, comment}: { workshopId: string, commentId: string, comment: string }) => {
                return this.commentsService.updateComment(workshopId, commentId, comment).pipe(
                    map(newComment => {
                        return new WorkshopCommentsUpdated({commentId, comment: newComment.comment});
                    }),
                    catchError((error) => {
                        return of(new WorkshopCommentsUpdatingFailed({error}));
                    })
                );
            }));

    @Effect()
    WorkshopCommentsDeleting$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopCommentsDeleting),
            map((action: WorkshopCommentsDeleting) => action.payload),
            exhaustMap(({workshopId, commentId}: { workshopId: string, commentId: string}) => {
                return this.commentsService.deleteComment(workshopId, commentId).pipe(
                    map(responce => {
                        return new WorkshopCommentsDeleted({commentId: responce.commId});
                    }),
                    catchError((error) => {
                        return of(new WorkshopCommentsDeletingFailed({error}));
                    })
                );
            }));

    @Effect()
    TagsRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.TagsRequested),
            exhaustMap(() => {
                return this.tagService.getAllTags().pipe(
                    map(tags => {
                        return new TagsLoaded({tags});
                    }),
                    catchError((error) => {
                        return of(new TagsLoadingFailed({error}));
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
                        return new UsersLoaded({users});
                    }),
                    catchError((error) => {
                        return of(new UsersLoadingFailed({error}));
                    })
                );
            }));

    constructor(private actions$: Actions,
                private workshopService: WorkshopService,
                private commentsService: CommentService,
                private tagService: TagsService,
                private store: Store<AppState>) {
    }
}
