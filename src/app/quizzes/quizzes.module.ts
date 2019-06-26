import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizzesRoutingModule} from './quizzes-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import {SharedModule} from '../shared/shared.module';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizConstructorComponent } from './quiz-constructor/quiz-constructor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';
import { FormsModule } from '@angular/forms';
import { AnswerGroupComponent } from './answer-group/answer-group.component';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import { QuizzesToConfigPipe } from './pipes/quizzes-to-config.pipe';

@NgModule({
    declarations: [QuizComponent, QuizzesComponent, QuizConstructorComponent, AnswerGroupComponent, QuizItemComponent, QuizzesToConfigPipe],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        QuizzesRoutingModule,
        FormControlsModule,
        DynamicFormModule,
        SharedModule,
    ],
    exports: [QuizComponent, ]
})
export class QuizzesModule {
}
