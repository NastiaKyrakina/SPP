import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkshopsComponent} from './components/workshops/workshops.component';
import {WorkshopComponent} from './components/workshop/workshop.component';
import {WorkshopCommentsComponent} from './components/workshop-comments/workshop-comments.component';
import {WorkshopQuizzesComponent} from './components/workshop-quizzes/workshop-quizzes.component';
import {CreateWorkshopComponent} from './components/create-workshop/create-workshop.component';

const routes: Routes = [
    {
        path: 'feed',
        component: WorkshopsComponent,
    },
    {
        path: 'workshop/:id',
        component: WorkshopComponent,
        children: [
            {path: 'comments',
                component: WorkshopCommentsComponent,
                outlet: 'aside'},
            {path: 'quizzes', component: WorkshopQuizzesComponent, outlet: 'aside'},
        ]
    },
    {
        path: 'create',
        component: CreateWorkshopComponent,
    },
    {
        path: ':id/edit',
        component: CreateWorkshopComponent,
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {
}
