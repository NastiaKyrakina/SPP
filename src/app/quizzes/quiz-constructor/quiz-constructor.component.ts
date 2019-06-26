import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-quiz-constructor',
    templateUrl: './quiz-constructor.component.pug',
    styleUrls: ['./quiz-constructor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizConstructorComponent implements OnInit {
    quizForm: FormGroup;
    options = [
        {
            name: 'One correct answer',
            value: 'answer',
        },
        {
            name: 'Multiply answer',
            value: 'answers',
        }
    ];
    defaultOption: string;
    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.quizForm = this.fb.group({
            name: ['', [Validators.required,]],
            questions: this.fb.array([], [])
        });
        this.defaultOption = this.options[0].value;
    }

    submitForm() {
    }

    addQuestion() {
        (this.quizForm.get('questions') as FormArray).push(
            new FormGroup({
                question: new FormControl(''),
                type: new FormControl(this.defaultOption),
                answer: new FormControl(''),
                answers: new FormArray([new FormGroup({
                    isCorrect: new FormControl(false),
                    answer: new FormControl(''),
                })]),
            })
        );
        console.log((this.quizForm.get('questions') as FormArray).controls);
    }
}
