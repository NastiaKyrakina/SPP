import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {TopPaneComponent} from './top-pane/top-pane.component';

@NgModule({
    declarations: [SideMenuComponent, TopPaneComponent],
    imports: [
        CommonModule,
        CoreRoutingModule
    ],
    exports: [SideMenuComponent, TopPaneComponent],
})
export class CoreModule {
}
