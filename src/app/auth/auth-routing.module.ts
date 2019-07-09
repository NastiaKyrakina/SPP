import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingInComponent} from './components/sing-in/sing-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';

const routes: Routes = [
    {
        path: 'login',
        component: SingInComponent,
    },
    {
        path: 'auth/sing-up',
        component: SignUpComponent,
    },
    {
        path: 'auth/reset',
        component: PasswordResetComponent,
    },
    {
        path: 'auth/logout',
        redirectTo: 'login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
