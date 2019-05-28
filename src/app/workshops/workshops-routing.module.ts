import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import {WorkshopsResolverService} from './workshops-resolver.service';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {WorkshopResolverService} from './workshop-resolver.service';

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
        }
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
