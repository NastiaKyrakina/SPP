import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
 } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

import {Comment} from 'src/app/models/additional.model';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.pug',
    styleUrls: ['./comment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
    @Input() comment: Comment | null = null;
    @Output() closedForm = new EventEmitter<boolean>();
    @Output() submitedForm = new EventEmitter<Comment>();
    text: string;
    isEdit: boolean;

    constructor() {
    }

    ngOnInit() {
        this.isEdit = !!this.comment;
        this.text = this.isEdit ? this.comment.text : '';
    }

    closeForm(): void {
        this.closedForm.emit(true);
    }

    submitForm(commentForm: NgForm): void {
        if (!commentForm.form.invalid) {
            const text = commentForm.form.value.comment;
            // bug: must add correct data for new comment
            const comment = {
                id: 6,
                wrkId: 1,
                userId: 1,
                text,
                date: new Date(),
            };
            this.submitedForm.emit(comment);
            commentForm.form.reset();
        }
    }


}
