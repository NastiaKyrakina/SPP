import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';

import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {TopPaneComponent} from './components/top-pane/top-pane.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { ToastPopupComponent } from './components/toast-popup/toast-popup.component';
import {GeneralModule} from '../general/general.module';



@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent, ToastPopupComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        OverlayModule,
        PortalModule,
        GeneralModule,
    ],
    exports: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent],
})
export class CoreModule {
}
