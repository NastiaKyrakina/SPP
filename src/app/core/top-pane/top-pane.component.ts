import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

import {UserModel} from '../../models/user.model';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../root-service/users.service';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit {
    @Output() clOnMenuBtn = new EventEmitter<boolean>();
    // user
    user: UserModel;
    searchOpen = false;

    constructor(private userSrv: UsersService) {
    }

    ngOnInit() {
        this.user =  this.userSrv.getCurrentUser();
    }

    changeMenuState(): void {
        this.clOnMenuBtn.emit(true);
    }

    changeSrchBarState(): void {
        this.searchOpen = !this.searchOpen;
    }

    getFullName(user: UserModel): string {
        return user.fname + ' ' + user.lname;
    }
    // will be implement in future
    startSearch(form: NgForm): void {
        console.log(form);
    }
}
