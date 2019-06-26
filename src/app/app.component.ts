import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'Skills++';
    menuOpened = false;

    changeMenuState(): void {
        this.menuOpened = !this.menuOpened;
    }

    constructor(private auth: AuthService,
                private userServ: UserService) {
    }

    ngOnInit(): void {
    }
}
