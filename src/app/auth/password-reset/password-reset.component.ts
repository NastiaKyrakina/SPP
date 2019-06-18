import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.pug',
  styleUrls: ['./password-reset.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetComponent implements OnInit {

    resetForm: FormGroup;
    return: string;
    success = false;
    constructor(private fb: FormBuilder,
                private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
        this.resetForm = fb.group({
            password: ['', [Validators.required, ]],
            passwordRepeat: ['', [Validators.required, ]]
        });
    }

    ngOnInit() {
        this.route.queryParams.pipe(take(1))
            .subscribe(params => this.return = params.return || '/workshops');
    }

    submitForm(): void {
        if (this.resetForm.valid) {
            this.userService.
            changeUser({password: this.resetForm.value.password})
                .pipe(
                    take(1)
                )
                .subscribe((resp) => {
                    if (resp.user) {
                        this.success = true;
                    }
                });
        }
    }

}
