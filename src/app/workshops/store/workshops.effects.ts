import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    TagsLoaded,
    TagsLoadingFailed,
    TagsRequested,
    UsersLoaded,
    UsersLoadingFailed,
    UsersRequested,
    WorkshopAddQuizRequested,
    WorkshopChangeReactionRequested,
    WorkshopCommentsCreated,
    WorkshopCommentsCreating,
    WorkshopCommentsCreatingFailed,
    WorkshopCommentsDeleted,
    WorkshopCommentsDeleting,
    WorkshopCommentsDeletingFailed,
    WorkshopCommentsLoaded,
    WorkshopCommentsLoadingFailed,
    WorkshopCommentsRequested,
    WorkshopCommentsUpdated,
    WorkshopCommentsUpdating,
    WorkshopCommentsUpdatingFailed,
    WorkshopDeleted,
    WorkshopDeleting,
    WorkshopLoaded,
    WorkshopLoadingFailed,
    WorkshopQuizAdded,
    WorkshopQuizAddingFailed,
    WorkshopQuizzesLoaded,
    WorkshopQuizzesLoadingFailed,
    WorkshopQuizzesRequested,
    WorkshopReactionChanged,
    WorkshopReactionChangingFailed,
    WorkshopReactionLoaded, WorkshopReactionLoadingFailed,
    WorkshopReactionRequested,
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
import {AppState} from '../../store';
import {TagsService} from '../../services/tags.service';
import {of} from 'rxjs';
import {CommentModel} from '../../models/workshop.model';
import {QuizService} from '../../quizzes/services/quiz.service';
import {ReactionService} from '../../services/reaction.service';

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
                    map(response => {
                        const workshops = response.posts.map(post => {
                            post.likesCount = 0;
                            return post;
                        });
                        const add = page !== '0';
                        const workshopsAuthors = workshops.map(workshop => workshop.author);
                        if (workshopsAuthors.length) {
                            this.store.dispatch(new UsersRequested({usersIds: workshopsAuthors}));
                        }
                        return new WorkshopsLoaded({
                            total: +response.total,
                            offset: +response.offset,
                            add,
                            workshops
                        });
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
    WorkshopDeleting$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopDeleting),
            map((action: WorkshopDeleting) => action.payload),
            exhaustMap(({workshopId}: { workshopId: string }) => {
                return this.workshopService.deleteWorkshop(workshopId).pipe(
                    map(responce => {
                        return new WorkshopDeleted({workshopId});
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
                        if (commentsAuthors.length) {
                            this.store.dispatch(new UsersRequested({usersIds: commentsAuthors}));
                        }
                        return new WorkshopCommentsLoaded({comments});
                    }),
                    catchError((error) => {
                        return of(new WorkshopCommentsLoadingFailed({error}));
                    })
                );
            }));

    @Effect()
    WorkshopQuizzesRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopQuizzesRequested),
            map((action: WorkshopQuizzesRequested) => action.payload),
            exhaustMap(({workshopId}: { workshopId: string }) => {
                return this.quizService.getQuizzes({page: '0', postId: workshopId}).pipe(
                    map(quizzes => {
                        return new WorkshopQuizzesLoaded({quizzes});
                    }),
                    catchError((error) => {
                        return of(new WorkshopQuizzesLoadingFailed({error}));
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
            exhaustMap(({workshopId, commentId}: { workshopId: string, commentId: string }) => {
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
    WorkshopAddQuizRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopAddQuizRequested),
            map((action: WorkshopAddQuizRequested) => action.payload),
            exhaustMap(({workshopsId, quizId}: { workshopsId: string[], quizId: string }) => {
                return this.quizService.updateQuiz(quizId, {posts: workshopsId}).pipe(
                    map(responce => {
                        return new WorkshopQuizAdded({quiz: responce.quiz[0]});
                    }),
                    catchError((error) => {
                        return of(new WorkshopQuizAddingFailed({error}));
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

    @Effect()
    WorkshopChangeReactionRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopChangeReactionRequested),
            map((action: WorkshopChangeReactionRequested) => action.payload),
            exhaustMap(({type, workshopId, withAuthorIds}: { type: string, workshopId: string, withAuthorIds: number }) => {
                return this.reactionService.changeReactions(type, workshopId, withAuthorIds).pipe(
                    map(reactions => {
                        return new WorkshopReactionChanged({reactions});
                    }),
                    catchError((error) => {
                        return of(new WorkshopReactionChangingFailed({error}));
                    })
                );
            }));
    @Effect()
    WorkshopReactionRequested$ = this.actions$
        .pipe(
            ofType(WorkshopsActionTypes.WorkshopReactionRequested),
            map((action: WorkshopReactionRequested) => action.payload),
            exhaustMap(({type}: { type: string}) => {
                return this.reactionService.getMyReactions(type).pipe(
                    map(response => {
                        return new WorkshopReactionLoaded({reactions: response.posts});
                    }),
                    catchError((error) => {
                        return of(new WorkshopReactionLoadingFailed({error}));
                    })
                );
            }));

    constructor(private actions$: Actions,
                private workshopService: WorkshopService,
                private commentsService: CommentService,
                private quizService: QuizService,
                private tagService: TagsService,
                private reactionService: ReactionService,
                private store: Store<AppState>) {
    }
}
