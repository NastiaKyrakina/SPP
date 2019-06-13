import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {UsersService} from '../../root-service/users.service';
import {UserModel} from '../../models/user.model';

@Directive({
    selector: '[appCurentUserObj]'
})
export class CurrentUserObjDirective implements OnInit {

    @Input() className = 'owner';
    @Input() user: UserModel | number;
    currentUser: UserModel;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2,
                private userService: UsersService) {
    }

    ngOnInit() {
        this.currentUser = this.userService.getCurrentUser();
        if (typeof this.user === 'object' &&
            this.user.id == this.currentUser.id ||
            typeof this.user === 'number' &&
            this.user == this.currentUser.id) {
            this.renderer.addClass(this.elRef.nativeElement, this.className);
        }
    }
}
