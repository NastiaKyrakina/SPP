import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {WorkshopCommentsComponent} from './workshop-comments/workshop-comments.component';
import {WorkshopQuizzesComponent} from './workshop-quizzes/workshop-quizzes.component';
import {WorkshopResourcesComponent} from './workshop-resources/workshop-resources.component';

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
            {path: 'resources', component: WorkshopResourcesComponent, outlet: 'aside'},
        ]
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
