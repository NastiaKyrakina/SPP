import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';

const routes: Routes = [
    {path: 'workshop/:id', component: WorkshopComponent},
    {path: '', component: WorkshopsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {
}
