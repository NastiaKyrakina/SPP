import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthInterceptor} from './interceptors/auth.interceptor';
import {UserService} from './services/user.service';
import {DynamicFormModule} from './dynamic-form/dynamic-form.module';

export function userProviderFactory(provider: UserService) {
    return () => provider.getUserBeforeInit();
}

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        DynamicFormModule
    ],
    providers: [
    UserService, {
            provide: APP_INITIALIZER, useFactory: userProviderFactory, deps: [UserService], multi: true
        },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
