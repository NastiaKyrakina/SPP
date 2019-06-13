import {Component, OnInit, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.pug',
    styleUrls: ['./tab-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements OnInit, AfterContentInit  {
    @ContentChildren(TabComponent, {descendants: true}) nestedTabs !: QueryList<TabComponent>;

    tabs = [];
    constructor() {
    }
    ngOnInit() {
    }
    ngAfterContentInit(): void {
        this.tabs = this.nestedTabs.toArray();
    }
}
