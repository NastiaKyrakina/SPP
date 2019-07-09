import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.pug',
    styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

    singUpForm: FormGroup;

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private authService: AuthService,
                private router: Router) {
        this.singUpForm = fb.group({
            username: ['', [Validators.required, ]],
            password: ['', [Validators.required, ]],
            firstName: [],
            lastName: [],
        });
    }

    ngOnInit() {
    }

    submitForm(): void {
        if (this.singUpForm.valid) {
            this.userService.singUp(this.singUpForm.value)
                .pipe(
                    take(1)
                )
                .subscribe(() => {
                    this.router.navigate(['/login']);
                });
        }
    }
}
