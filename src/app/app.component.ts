import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './reducers';
import {selectAuthenticated} from './auth/store/auth.selectors';
import {Observable} from 'rxjs';

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

    constructor(private store: Store<AppState>,
                ) {
        this.authenticated$ = this.store.pipe(select(selectAuthenticated));
    }

    ngOnInit(): void {
    }
}
