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

}
