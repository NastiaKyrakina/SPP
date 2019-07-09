import {Component, OnInit, Output, EventEmitter, OnDestroy, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';

import {selectCurrentUser} from '../../../auth/store/auth.selectors';
import {UserModel} from '../../../models/user.model';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
})
export class TopPaneComponent implements OnInit, OnDestroy {
    @Input() menuOpened = false;
    @Output() clOnMenuBtn = new EventEmitter<boolean>();
    user: UserModel | null = null;
    searchOpen = false;
    isPopMenuOpen = false;
    private userSbs: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.userSbs = this.store.pipe(select(selectCurrentUser)).subscribe(
            user => {
                this.user = user;
            }
        );
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
    startSearch(form: NgForm): void {
    }

    changePopMenuState(): void {
        this.isPopMenuOpen = !this.isPopMenuOpen;
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
