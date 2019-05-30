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
        let text = commentForm.form.value.comment;
        let comment = {
                id: 1,
                wrkId: 1,
                userId: 1,
                text,
                date: new Date(2019, 0, 1, 0, 0, 0, 0),
            };
        console.log(comment);
        this.submitedForm.emit(comment);
    }
}
