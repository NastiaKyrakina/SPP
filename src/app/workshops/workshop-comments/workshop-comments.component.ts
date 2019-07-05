import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';

import {Comment} from '../../models/additional.model';
import {WorkshopService} from '../services/workshop.service';
import {ActivatedRoute} from '@angular/router';
import {CommentModel} from '../../models/workshop.model';
import {CommentService} from '../../services/comment.service';
import {comments} from '../workshops-data/additional';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {
    WorkshopCommentsCreating, WorkshopCommentsDeleting,
    WorkshopCommentsRequested,
    WorkshopCommentsUpdating,
    WorkshopRequested
} from '../store/workshops.actions';
import {selectIsWorkshopLoaded, selectUsers, selectWorkshopComments} from '../store/workshops.selectors';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {

    constructor(private wrkService: WorkshopService,
                private commentService: CommentService,
                private route: ActivatedRoute,
                private ref: ChangeDetectorRef,
                private store: Store<AppState>) {
    }

    comments: Array<CommentModel>;
    comments$: Observable<Array<CommentModel>>;
    workshopId: string;
    private routeSbs: Subscription;
    users$: Observable<Array<UserModel>>;

    static trackComment(index: number, item: CommentModel): string {
        return item.id;
    }

    ngOnInit() {
        this.routeSbs = this.route.parent.paramMap.subscribe(params => {
            this.workshopId = params.get('id');
            this.store.dispatch(new WorkshopCommentsRequested({workshopId: this.workshopId}));
        });
        this.comments$ = this.store.pipe(select(selectWorkshopComments));
        this.users$ = this.store.pipe(select(selectUsers));

    }

    addComment($event: string): void {
        this.store.dispatch(new WorkshopCommentsCreating({workshopId: this.workshopId, comment: $event}));
    }

    deleteComment($event: string) {
        this.store.dispatch(new WorkshopCommentsDeleting(
            {
                workshopId: this.workshopId,
                commentId: $event
            }));
    }

    editeComment($event: { id: string; text: string }) {
        this.store.dispatch(new WorkshopCommentsUpdating(
            {
                workshopId: this.workshopId,
                commentId: $event.id,
                comment: $event.text
            }));
    }

    ngOnDestroy(): void {
        this.routeSbs.unsubscribe();
    }
}
