import { Component } from '@angular/core';
import { User } from '../interface/user';
import { MenuItems } from '../interface/menuItems';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Skills++';
    menuOpened = false;
    changeMenuState(): void {
        this.menuOpened = !this.menuOpened;
    }
}
