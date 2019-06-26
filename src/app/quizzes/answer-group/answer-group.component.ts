import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Option} from '../../form-controls/dropdown/dropdown.component';

@Component({
    selector: 'app-answer-group',
    templateUrl: './answer-group.component.pug',
    styleUrls: ['./answer-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerGroupComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() question: FormGroup;
    @Input() options: Array<Option>;
    currentOption: string;

    constructor() {
    }

    ngOnInit() {
        console.log(this.question.get('type').value);
        this.currentOption = this.question.get('type').value;
    }

    changeSelect(index: number, control: string): void {
        console.log(this.question);
        // // console.log((this.quizForm.get('questions') as FormArray).at(index));
        this.question.removeControl(this.currentOption);
        this.question.addControl(control, new FormControl(''));
        this.currentOption = control;
    }

}
