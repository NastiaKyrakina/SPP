import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {MenuItems} from '../interface/menuItems';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.pug',
    styleUrls: ['./side-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
    @Input() menuOpened: boolean;
    @Output() clOnMenuDrop = new EventEmitter<boolean>();
    /*dynamic list of side-menu items*/
    sideMenuItems: MenuItems = [
        {title: 'Dashboard', href: '/dashboard', icon: 'stats-bars2'},
        {title: 'Lessons',  href: '/', icon: 'book'},
        {title: 'Quizzes',  href: '/quizzes', icon: 'bubbles'}
    ];

    constructor() {
    }

    ngOnInit() {
    }
    changeMenuState(evn): void {
        this.clOnMenuDrop.emit(true);
    }

}
