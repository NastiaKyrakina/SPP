import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Comment} from 'src/app/module/additional';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.pug',
    styleUrls: ['./comment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent implements OnInit {
    @Input() comment: Comment | null;
    @Output() closedForm = new EventEmitter<boolean>();
    @Output() submitedForm = new EventEmitter<Comment>();
    @ViewChild('area') area: ElementRef;
    isEdit = false;

    constructor() {
    }

    ngOnInit() {
        if (this.comment) {
            console.log(this.comment);
        }
    }

    closeForm(): void {
        this.closedForm.emit(true);
    }

    submitForm(commentForm: NgForm): void {
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
    }
}
