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


@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule,
        OverlayModule,
        PortalModule,
    ],
    exports: [SideMenuComponent, TopPaneComponent, ConfirmPopupComponent],
})
export class CoreModule {
}
