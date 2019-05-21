import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkshopsComponent} from './workshops/workshops.component';

const routes: Routes = [
    {path: '', component: WorkshopsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkshopsRoutingModule {
}
