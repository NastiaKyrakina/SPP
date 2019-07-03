import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input} from '@angular/core';

import {UserModel} from '../../models/user.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {takeUntil} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {selectCurrentUser} from '../../auth/store/auth.selectors';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush
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
