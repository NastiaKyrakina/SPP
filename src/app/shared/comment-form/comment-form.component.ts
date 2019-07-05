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
import {CommentModel} from "../../models/workshop.model";

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.pug',
    styleUrls: ['./comment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
    @Input() comment: CommentModel | null = null;
    @Output() closedForm = new EventEmitter<boolean>();
    @Output() submitedForm = new EventEmitter<string>();
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
            const comment = {
                text,
            };
            this.submitedForm.emit(text);
            commentForm.form.reset();
        }
    }


}
