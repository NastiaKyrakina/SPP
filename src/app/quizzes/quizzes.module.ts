import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizzesRoutingModule} from './quizzes-routing.module';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
    declarations: [QuizComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule
    ],
    exports: [QuizComponent, ]
})
export class QuizzesModule {
}
