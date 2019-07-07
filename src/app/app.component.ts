import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './reducers';
import {selectAuthenticated, selectCurrentUser} from './auth/store/auth.selectors';
import {Observable} from 'rxjs';
import {CurrentUserRequested} from './auth/store/auth.actions';
import {CONFIRM, PopupService, TOAST, TOP} from './core/popup.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'Skills++';
    menuOpened = false;
    authenticated$: Observable<boolean>;

    changeMenuState(): void {
        this.menuOpened = !this.menuOpened;
    }

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(new CurrentUserRequested());
        this.authenticated$ = this.store.pipe(select(selectAuthenticated));
        const user$ = this.store.pipe(select(selectCurrentUser));
    }
}
