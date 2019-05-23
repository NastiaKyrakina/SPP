import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Comment} from 'src/app/module/additional';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.pug',
    styleUrls: ['./comment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
    @Input() comment: Comment | null;
    constructor() {
    }

    ngOnInit() {
        if (this.comment) {
            console.log(this.comment);
        }
    }

}
