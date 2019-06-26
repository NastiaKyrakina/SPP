import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {QuizModel} from '../models/quiz.model';

@Component({
    selector: 'app-quiz-item',
    templateUrl: './quiz-item.component.pug',
    styleUrls: ['./quiz-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemComponent implements OnInit {

    @Input() quiz: QuizModel;
    isAuthor: boolean;
    constructor() {
    }

    ngOnInit() {
    }

}
