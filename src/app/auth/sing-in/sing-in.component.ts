import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {PrivateDataModel} from '../../models/user.model';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {SignInRequested} from '../store/auth.actions';

@Component({
    selector: 'app-login',
    templateUrl: './sing-in.component.pug',
    styleUrls: ['./sing-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingInComponent implements OnInit {

    singInForm: FormGroup;
    return: string;
    constructor(private fb: FormBuilder,
                private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<AppState>) {
        this.singInForm = fb.group({
            username: ['', [Validators.required, ]],
            password: ['', [Validators.required, ]],
        });
    }

    ngOnInit() {
        this.route.queryParams.pipe(take(1))
            .subscribe(params => this.return = params.return || '/workshops');
        this.authService.logout();
    }

    submitForm(): void {
        if (this.singInForm.valid) {
            this.store.dispatch(new SignInRequested({
                data: this.singInForm.value,
                redirectTo: this.return,
            }));
        }
    }
}
