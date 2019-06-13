import { Component } from '@angular/core';

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
