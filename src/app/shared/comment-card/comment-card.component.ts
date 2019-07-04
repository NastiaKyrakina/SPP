import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentRef, ComponentFactoryResolver, Output, EventEmitter, OnDestroy
} from '@angular/core';

import {Comment} from 'src/app/models/additional.model';
import {UserModel} from '../../models/user.model';
import {users} from '../../../data/data';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {WorkshopService} from '../../workshops/services/workshop.service';
import {UserService} from '../../services/user.service';
import {CommentModel} from "../../models/workshop.model";
import {Observable, Subscription} from "rxjs";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../auth/store/auth.selectors';
import {take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.pug',
    styleUrls: ['./comment-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent implements OnInit, OnDestroy {
    @Input() comment: CommentModel;
    @Input() user: UserModel;
    @Output() deletedComment = new EventEmitter<string>();
    @Output() editedComment = new EventEmitter<{ id: string; text: string; }>();
    @ViewChild('commentForm', {read: ViewContainerRef}) form;
    current: UserModel;
    comtMenuOpened = false;
    formOpen = false;

    componentRef: ComponentRef<CommentFormComponent>;
    private userSbs: Subscription;
    private componentSbs: Subscription;


    constructor(private resolver: ComponentFactoryResolver,
                private wrkService: WorkshopService,
                private userService: UserService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.userSbs = this.store.pipe(select(selectCurrentUser)).subscribe((current) => {
            this.current = current;
        });
    }

    openMenu(): void {
        this.comtMenuOpened = !this.comtMenuOpened;
    }

    openForm(): void {
        const factory = this.resolver
            .resolveComponentFactory(CommentFormComponent);
        this.componentRef = this.form.createComponent(factory);
        this.componentRef.instance.comment = this.comment;
        this.formOpen = true;
        this.componentRef.instance.isEdit = true;
        this.componentRef.instance.closedForm.pipe(take(1)).subscribe(val => {
            this.closeForm();
        });
        this.componentSbs = this.componentRef.instance.submitedForm.subscribe(text => {
            this.editedComment.emit({id: this.comment.id, text});
            this.closeForm();
        });
    }

    closeForm(): void {
        this.formOpen = false;
        this.componentRef.destroy();
    }

    deleteComment() {
        this.deletedComment.emit(this.comment.id);
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
        this.componentSbs.unsubscribe();
    }
}
