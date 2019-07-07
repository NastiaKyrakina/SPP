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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './reducers/app.effects';
import {AuthModule} from './auth/auth.module';
import {ConfirmPopupComponent} from './core/confirm-popup/confirm-popup.component';
import {ToastPopupComponent} from './core/toast-popup/toast-popup.component';


@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AuthModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        DynamicFormModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([AppEffects])
    ],
    entryComponents: [
        ConfirmPopupComponent, ToastPopupComponent
    ],
    exports: [],
    providers: [
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
