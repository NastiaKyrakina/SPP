import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.pug',
    styleUrls: ['./tab-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements OnInit  {
    tabs = [];
    constructor() {
    }
    ngOnInit() {
        this.tabs[0].active  = true;
    }

    addTab(tab: TabComponent): void {
        this.tabs.push(tab);
    }
}
