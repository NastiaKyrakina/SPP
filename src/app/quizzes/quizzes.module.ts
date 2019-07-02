import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizzesRoutingModule} from './quizzes-routing.module';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {SharedModule} from '../shared/shared.module';
import {QuizComponent} from './quiz/quiz.component';
import {QuizConstructorComponent} from './quiz-constructor/quiz-constructor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';
import {FormsModule} from '@angular/forms';
import {QuestionCreateComponent} from './question-create/question-create.component';
import {QuizItemComponent} from './quiz-item/quiz-item.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import {QuizzesToConfigPipe} from './pipes/quizzes-to-config.pipe';
import {QuestionBlockComponent} from './question-block/question-block.component';
import {MarkDirective} from './directives/mark.directive';
import { AuthorPipe } from './pipes/author.pipe';
import { StoreModule } from '@ngrx/store';
import * as fromQuizzes from './store/quizzes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuizzesEffects } from './store/quizzes.effects';

@NgModule({
    declarations: [
        QuizzesComponent,
        QuizComponent,
        QuizConstructorComponent,
        QuestionCreateComponent,
        QuizItemComponent,
        QuizzesToConfigPipe,
        QuestionBlockComponent,
        MarkDirective,
        AuthorPipe],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        QuizzesRoutingModule,
        FormControlsModule,
        DynamicFormModule,
        SharedModule,
        StoreModule.forFeature('quizzes', fromQuizzes.quizzesReducer),
        EffectsModule.forFeature([QuizzesEffects]),
    ],
    exports: [QuizzesComponent, ]
})
export class QuizzesModule {
}
