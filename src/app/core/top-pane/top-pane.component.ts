import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {User} from '../../../interface/user';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit {
    @Output() clOnMenuBtn = new EventEmitter<boolean>();
    // user
    user: User = {
        name: 'Louis George',
        img: 'user.png'
    };
    searchOpen = false;

    constructor() {
    }

    ngOnInit() {
    }
    changeMenuState(evn): void {
       this.clOnMenuBtn.emit(true);
    }
    openSearchBar(): void {
        this.searchOpen = !this.searchOpen;
    }
}
