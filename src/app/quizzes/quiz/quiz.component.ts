import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-quizze',
    templateUrl: './quiz.component.pug',
    styleUrls: ['./quiz.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
