import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {path: 'workshops', loadChildren: './workshops/workshops.module#WorkshopsModule'},
    {path: 'quizzes', loadChildren: './quizzes/quizzes.module#QuizzesModule'},
    {path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
