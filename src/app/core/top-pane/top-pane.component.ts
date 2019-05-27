import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {currentUser} from '../../../data/data';
import {User} from '../../module/User';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit {
    @Output() clOnMenuBtn = new EventEmitter<boolean>();
    // user
    user = currentUser;
    searchOpen = false;

    constructor() {
    }

    ngOnInit() {
    }

    changeMenuState(): void {
        this.clOnMenuBtn.emit(true);
    }

    changeSrchBarState(): void {
        this.searchOpen = !this.searchOpen;
    }

    getFullName(user: User): string {
        return user.fname + ' ' + user.lname;
    }
    // will be implement in future
    startSearch(form: NgForm): void {
        console.log(form);
    }
}
