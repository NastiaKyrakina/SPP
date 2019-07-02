import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {MenuItems} from '../models/menu-items.model';

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
        {title: 'Lessons', href: '/workshops/feed', icon: 'book'},
        {title: 'Quizzes', href: '/quizzes', icon: 'bubbles'}
    ];

    constructor() {
    }

    ngOnInit() {
    }

    changeMenuState(): void {
        this.clOnMenuDrop.emit(true);
    }

}
