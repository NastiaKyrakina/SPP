import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingInComponent} from './sing-in/sing-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';

const routes: Routes = [
    {
        path: 'login',
        component: SingInComponent,
    },
    {
        path: 'sing-up',
        component: SignUpComponent,
    },
    {
        path: 'reset',
        component: PasswordResetComponent,
    },
    {
        path: 'logout',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
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
