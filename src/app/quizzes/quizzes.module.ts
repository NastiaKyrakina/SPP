import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizzesRoutingModule} from './quizzes-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [QuizComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
    ],
    exports: [QuizComponent, ]
})
export class QuizzesModule {
}
