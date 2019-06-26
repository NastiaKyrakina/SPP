import {Component, OnInit, Input, ContentChildren} from '@angular/core';

import {TabGroupComponent} from '../tab-group/tab-group.component';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.pug',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
    @Input() title: string;
    @Input() href: string;
    active = false;

    constructor() {
    }

    ngOnInit() {
    }

}
