import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../services/quiz.service';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {QuizCreatingRequested} from '../store/quizzes.actions';

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
            value: 'input',
        },
        {
            name: 'Multiply answer',
            value: 'select',
        }
    ];
    defaultOption: string;

    constructor(private fb: FormBuilder,
                private quizService: QuizService,
                private store: Store<AppState>) {}

    ngOnInit() {
        this.quizForm = this.fb.group({
            name: ['', [Validators.required, ]],
            questions: this.fb.array([], [])
        });
        this.defaultOption = this.options[0].value;
    }

    submitForm() {
        if (this.quizForm.valid) {
            this.store.dispatch(new QuizCreatingRequested({quiz: this.quizForm.value}));
           // this.quizForm.reset();
            // this.quizService.createQuiz(this.quizForm.value)
            //     .pipe(take(1))
            //     .subscribe(resp => {
            //         console.log(resp);
            //     });
        }
    }

    get name() {
        return this.quizForm.get('name');
    }

    get questions() {
        return (this.quizForm.get('questions') as FormArray).controls;
    }
    addQuestion() {
        (this.quizForm.get('questions') as FormArray).push(
            new FormGroup({
                question: new FormControl('', [Validators.required, ]),
                questionType: new FormControl(this.defaultOption, [Validators.required, ]),
                correctAnswer: new FormControl('', [Validators.required, ]),
            })
        );
    }

    removeQuestion(index: number) {
        (this.quizForm.get('questions') as FormArray).removeAt(index);
    }
}
