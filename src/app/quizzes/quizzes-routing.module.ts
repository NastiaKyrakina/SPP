import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {QuizComponent} from './quiz/quiz.component';
import {QuizzesComponent} from './quizzes/quizzes.component';
import {QuizConstructorComponent} from './quiz-constructor/quiz-constructor.component';

const routes: Routes = [
    {path: 'quiz/:id', component: QuizzesComponent},
    {path: 'list', component: QuizComponent,
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
