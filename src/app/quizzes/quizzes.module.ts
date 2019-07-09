import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QuizzesRoutingModule} from './quizzes-routing.module';
import {QuizzesComponent} from './components/quizzes/quizzes.component';
import {SharedModule} from '../shared/shared.module';
import {QuizComponent} from './components/quiz/quiz.component';
import {QuizConstructorComponent} from './components/quiz-constructor/quiz-constructor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';
import {FormsModule} from '@angular/forms';
import {QuestionCreateComponent} from './components/question-create/question-create.component';
import {QuizItemComponent} from './components/quiz-item/quiz-item.component';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import {QuizzesToConfigPipe} from '../general/pipe/quizzes-to-config.pipe';
import {MarkDirective} from './directives/mark.directive';
import { StoreModule } from '@ngrx/store';
import * as fromQuizzes from './store/quizzes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuizzesEffects } from './store/quizzes.effects';
import {GeneralModule} from '../general/general.module';

@NgModule({
    declarations: [
        QuizzesComponent,
        QuizComponent,
        QuizConstructorComponent,
        QuestionCreateComponent,
        QuizItemComponent,
        QuizzesToConfigPipe,
        MarkDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        GeneralModule,
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
