import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';

import {Comment} from '../../models/additional.model';
import {WorkshopService} from '../services/workshop.service';
import {ActivatedRoute} from '@angular/router';
import {CommentModel} from '../../models/workshop.model';
import {CommentService} from "../../services/comment.service";
import {comments} from "../workshops-data/additional";
import {Observable, Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {WorkshopCommentsRequested, WorkshopRequested} from '../store/workshops.actions';
import {selectIsWorkshopLoaded, selectUsers, selectWorkshopComments} from '../store/workshops.selectors';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {
    comments: Array<CommentModel>;
    comments$: Observable<Array<CommentModel>>;
    workshopId: string;
    private routeSbs: Subscription;
    private dateSbs: Subscription;
    private users$: Observable<Array<UserModel>>;

    constructor(private wrkService: WorkshopService,
                private commentService: CommentService,
                private route: ActivatedRoute,
                private ref: ChangeDetectorRef,
                private store: Store<AppState>) {
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
        this.commentService.createComment(this.workshopId, $event)
            .pipe(take(1))
            .subscribe(resp => {
                //this.comments.push(resp.comment);
                this.ref.detectChanges();
            });
    }

    changeComment($event: string): void {
        this.commentService.createComment(this.workshopId, $event)
            .pipe(take(1))
            .subscribe(resp => {
                //this.comments.push(resp.comment);
                this.ref.detectChanges();
            });
    }

    deleteComment($event: string) {
        this.commentService.deleteComment(this.workshopId, $event)
            .pipe(take(1))
            .subscribe(
                resp => {
                    //this.comments = this.comments.filter(comment => comment._id !== resp.commId);
                    this.ref.detectChanges();
                }
            );
    }

    editeComment($event: { id: string; text: string }) {
        this.commentService.updateComment(this.workshopId, $event.id, $event.text)
            .pipe(take(1))
            .subscribe(
                resp => {
                    const index = this.comments.findIndex(comment => comment._id === resp.comment._id);
                    // this.comments[index] = resp.comment;
                    this.ref.detectChanges();
                }
            );
    }

    trackComment(index: number, item: CommentModel): string {
        return item._id;
    }
    ngOnDestroy(): void {
        this.routeSbs.unsubscribe();
        // this.dateSbs.unsubscribe();
    }
}
