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

    submitForm(): void {

        this.closedForm.emit(true);
    }
}
