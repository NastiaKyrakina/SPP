import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import {WorkshopsResolverService} from './workshops-resolver.service';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {WorkshopResolverService} from './workshop-resolver.service';
import {WorkshopCommentsComponent} from './workshop-comments/workshop-comments.component';
import {WorkshopQuizzesComponent} from "./workshop-quizzes/workshop-quizzes.component";
import {WorkshopResourcesComponent} from "./workshop-resources/workshop-resources.component";

const routes: Routes = [
    {
        path: 'feed',
        component: WorkshopsComponent,
        canActivate: [AuthGuard],
        resolve: {
            workshops: WorkshopsResolverService,
        }
    },
    {
        path: 'workshop/:id',
        component: WorkshopComponent,
        resolve: {
            workshop: WorkshopResolverService,
        },
        children: [
            {path: 'comments', component: WorkshopCommentsComponent, outlet: 'aside'},
            {path: 'quizzes', component: WorkshopQuizzesComponent, outlet: 'aside'},
            {path: 'resources', component: WorkshopResourcesComponent, outlet: 'aside'},
           // {path: '', redirectTo: 'comments', pathMatch: 'full', outlet: 'aside'},
        ]
    },
    {
        path: '',
        redirectTo: 'workshops',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {
}
