import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';

import {Comment} from '../../models/additional.model';
import {WorkshopService} from '../workshop.service';
import {ActivatedRoute} from '@angular/router';
import {CommentModel} from '../../models/workshop.model';
import {CommentService} from "../../services/comment.service";
import {comments} from "../workshops-data/additional";
import {Observable, Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {
    comments: Array<CommentModel>;
    comments$: Observable<Array<CommentModel>>;
    wrkId: string;
    private routeSbs: Subscription;
    private dateSbs: Subscription;

    constructor(private wrkService: WorkshopService,
                private commentService: CommentService,
                private route: ActivatedRoute,
                private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.routeSbs = this.route.parent.paramMap.subscribe(params => {
            this.wrkId = params.get('id');
        });
        this.dateSbs = this.route.data.subscribe((data: { comments: Array<CommentModel> }) => {
            this.comments = data.comments;
        });
    }

    addComment($event: string): void {
        this.commentService.createComment(this.wrkId, $event)
            .pipe(take(1))
            .subscribe(resp => {
            this.comments.push(resp.comment);
            this.ref.detectChanges();
        });
    }

   changeComment($event: string): void {
        this.commentService.createComment(this.wrkId, $event)
            .pipe(take(1))
            .subscribe(resp => {
                this.comments.push(resp.comment);
                this.ref.detectChanges();
        });
    }

    deleteComment($event: string) {
        this.commentService.deleteComment(this.wrkId, $event)
            .pipe(take(1))
            .subscribe(
            resp => {
                this.comments = this.comments.filter(comment => comment._id !== resp.commId);
                this.ref.detectChanges();
            }
        );
    }

    editeComment($event: { id: string; text: string }) {
        this.commentService.updateComment(this.wrkId, $event.id, $event.text)
            .pipe(take(1))
            .subscribe(
            resp => {
                const index = this.comments.findIndex(comment => comment._id === resp.comment._id);
                this.comments[index] = resp.comment;
                this.ref.detectChanges();
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSbs.unsubscribe();
        this.dateSbs.unsubscribe();
    }
}
