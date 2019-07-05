import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Option} from '../../form-controls/dropdown/dropdown.component';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-answer-group',
    templateUrl: './question-create.component.pug',
    styleUrls: ['./question-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCreateComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() question: FormGroup;
    @Input() options: Array<Option>;
    @Input() index: number;
    @Output() questionRemoved = new EventEmitter<number>();
    currentOption: string;

    constructor() {
    }

    ngOnInit() {
        this.currentOption = this.question.get('questionType').value;
    }

    changeSelect(index: number, control: string): void {
        switch (control) {
            case 'input': {
                this.question.removeControl('answerVariants');
                this.question.addControl('correctAnswer', new FormControl('', [Validators.required, ]));
                break;
            }
            case 'select': {
                this.question.removeControl('correctAnswer');
                this.question.addControl( 'answerVariants', new FormArray([new FormGroup({
                    isCorrect: new FormControl(false),
                    answer: new FormControl('', [Validators.required, ]),
                }), ]) );
                break;
            }
        }
        this.currentOption = control;
    }

    addVariant() {
        (this.question.get('answerVariants') as FormArray).push(
            new FormGroup({
                isCorrect: new FormControl(false),
                answer: new FormControl('', Validators.required)
            }));
    }

    removeVariant(j: number) {
        (this.question.get('answerVariants') as FormArray).removeAt(j);
    }

    removeQuestion(index: number) {
        this.questionRemoved.emit(index);
    }
}
