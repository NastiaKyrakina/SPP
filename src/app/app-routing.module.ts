import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: 'quizzes', loadChildren: './quizzes/quizzes.module#QuizzesModule'},
    {path: 'workshops',   canActivate: [AuthGuard], loadChildren: './workshops/workshops.module#WorkshopsModule'},
    {path: '', redirectTo: 'workshops', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
