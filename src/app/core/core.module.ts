import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SideMenuComponent} from './side-menu/side-menu.component';
import {TopPaneComponent} from './top-pane/top-pane.component';
import {SharedModule} from '../shared/shared.module';
import {CoreRoutingModule} from './core-routing.module';
import {FormsModule} from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { ToastPopupComponent } from './toast-popup/toast-popup.component';
import {GeneralModule} from '../general/general.module';


@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent, ToastPopupComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        OverlayModule,
        PortalModule,
        GeneralModule,
    ],
    exports: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent],
})
export class CoreModule {
}
