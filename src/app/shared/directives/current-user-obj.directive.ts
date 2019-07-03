import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {Subscription} from "rxjs";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../auth/store/auth.selectors';

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
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.userSbs = this.store.pipe(select(selectCurrentUser)).subscribe(
            user => {
                this.currentUser = user;
            }
        );
        if (typeof this.user === 'object' &&
            this.user.id === this.currentUser.id ||
            typeof this.user === 'string' &&
            this.user === this.currentUser.id) {
            this.renderer.addClass(this.elRef.nativeElement, this.className);
        }
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
