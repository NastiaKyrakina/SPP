import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy} from '@angular/core';

import {UserModel} from '../../models/user.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {takeUntil} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit, OnDestroy {
    @Output() clOnMenuBtn = new EventEmitter<boolean>();
    // user
    user: UserModel;
    searchOpen = false;
    isPopMenuOpen = false;
    private userSbs: Subscription;

    constructor(private userSrv: UserService) {
    }

    ngOnInit() {
        this.userSbs = this.userSrv.currentUser.subscribe((user) => {
            this.user = user;
        });
    }

    changeMenuState(): void {
        this.clOnMenuBtn.emit(true);
    }

    changeSrchBarState(): void {
        this.searchOpen = !this.searchOpen;
    }

    getFullName(user: UserModel): string {
        return user.firstName + ' ' + user.lastName;
    }
    // will be implement in future
    startSearch(form: NgForm): void {
    }

    changePopMenuState(): void {
        this.isPopMenuOpen = !this.isPopMenuOpen;
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
