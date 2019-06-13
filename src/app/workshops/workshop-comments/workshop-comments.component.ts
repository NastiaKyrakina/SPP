import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Comment} from '../../models/additional.model';
import {WorkshopService} from '../workshop.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit {
    comments: Array<Comment>;
    constructor(private wrkService: WorkshopService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.comments = this.wrkService.getComments();
    }
    addComment($event: Comment): void {
        this.wrkService.addComment($event);
    }

}
