import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SideMenuComponent} from './side-menu/side-menu.component';
import {TopPaneComponent} from './top-pane/top-pane.component';
import {SharedModule} from '../shared/shared.module';
import {CoreRoutingModule} from './core-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        FormsModule,
        SharedModule,
    ],
    exports: [SideMenuComponent, TopPaneComponent],
})
export class CoreModule {
}
