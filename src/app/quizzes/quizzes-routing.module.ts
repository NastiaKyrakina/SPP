import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {QuizzesComponent} from './quizzes/quizzes.component';
import {QuizComponent} from './quiz/quiz.component';
import {QuizConstructorComponent} from './quiz-constructor/quiz-constructor.component';

const routes: Routes = [
    {path: 'quiz/:id', component: QuizComponent},
    {path: 'list', component: QuizzesComponent,
        children: [
            {path: 'constructor',
                component: QuizConstructorComponent,
                outlet: 'aside'},
        ]},
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizzesRoutingModule {
}
