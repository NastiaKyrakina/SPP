import {Component} from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'Skills++';

    /*dynamic list of side-menu items*/
    sideMenuItems = [
        {title: 'Dashboard' ,   icon: 'stats-bars2'},
        {title: 'Lessons' ,     icon: 'book'},
        {title: 'Settings' ,    icon: 'equalizer'}
   ];

    // user with long name
    user = {
        name: 'Louis George Maurice Roche Albert Abel Antonio Alexandre',
        img: 'user.png'
    };

    menuOpened: boolean = false;
    searchOpen: boolean  = false;
    hasContent: boolean  = false;
    auxOpen: boolean  = false;

    clickedOnMenu(): void {
        this.menuOpened = !this.menuOpened;
    }
    openSearchBar(): void {
        this.searchOpen = !this.searchOpen;
    }
    openAuxContent(): void {
        this.auxOpen = !this.auxOpen;
    }
}
