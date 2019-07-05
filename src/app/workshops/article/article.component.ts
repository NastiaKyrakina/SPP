import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WorkshopModel} from '../../models/workshop.model';
import {UserModel} from '../../models/user.model';
import {WorkshopService} from '../services/workshop.service';
import {Tag} from '../../models/additional.model';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import {Observable, Subscription} from "rxjs";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../auth/store/auth.selectors';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit, OnDestroy {
    @Input() workshop: WorkshopModel;
    @Input() tags: Array<Tag>;
    @Input() user: UserModel;
    @Output() workshopDeleted = new EventEmitter<string>();
    currentUser: UserModel;
    likeIt: boolean;
    isOpen = true;
    contrMenuOpened = false;
    isAdmin = false;
    private userSbs: Subscription;
    constructor(private wrkService: WorkshopService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.wrkService.getTags(this.workshop.tags);
        this.likeIt = false;
        this.userSbs = this.store.pipe(select(selectCurrentUser)).subscribe(
            user => {
                this.currentUser = user;
                this.isAdmin = this.currentUser.role === 'admin';
            }
        );
    }

    liked($event: boolean): void {
        // this.wrkService.liked($event, this.workshop.id);
    }

    changeState(): void {
        this.isOpen = !this.isOpen;
    }

    deleteWorkshop() {
        this.workshopDeleted.emit(this.workshop.id);
    }

    openMenu() {
        this.contrMenuOpened = !this.contrMenuOpened;
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
