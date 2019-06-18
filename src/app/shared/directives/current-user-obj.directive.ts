import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {Subscription} from "rxjs";

@Directive({
    selector: '[appCurentUserObj]'
})
export class CurrentUserObjDirective implements OnInit, OnDestroy {

    @Input() className = 'owner';
    @Input() user: UserModel | number;
    currentUser: UserModel;
    private userSbs: Subscription;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userSbs = this.userService.currentUser.asObservable().subscribe(
            user => {
                this.currentUser = user;
            }
        );
        if (typeof this.user === 'object' &&
            this.user._id === this.currentUser._id ||
            typeof this.user === 'string' &&
            this.user === this.currentUser._id) {
            this.renderer.addClass(this.elRef.nativeElement, this.className);
        }
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
