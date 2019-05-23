import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {TopPaneComponent} from './top-pane/top-pane.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
    ],
    exports: [SideMenuComponent, TopPaneComponent],
})
export class CoreModule {
}
