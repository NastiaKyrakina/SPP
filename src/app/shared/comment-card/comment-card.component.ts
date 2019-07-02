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
import {WorkshopService} from '../../workshops/workshop.service';
import {UserService} from '../../services/user.service';
import {CommentModel} from "../../models/workshop.model";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.pug',
    styleUrls: ['./comment-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent implements OnInit, OnDestroy {
    @Input() comment: CommentModel;
    @Output() deletedComment = new EventEmitter<string>();
    @Output() editedComment = new EventEmitter<{ id: string; text: string; }>();
    @ViewChild('commentForm', {read: ViewContainerRef}) form;
    user$: Observable<UserModel>;
    current: UserModel;
    comtMenuOpened = false;
    formOpen = false;

    componentRef: ComponentRef<CommentFormComponent>;
    private userSbs: Subscription;

    constructor(private resolver: ComponentFactoryResolver,
                private wrkService: WorkshopService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userSbs = this.userService.currentUser.subscribe((current) => {
            this.current = current;
        });
        this.user$ = this.userService.getUser(this.comment._author);

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
        this.componentRef.instance.closedForm.subscribe(val => {
            this.closeForm();
        });
        this.componentRef.instance.submitedForm.subscribe(text => {
            this.editedComment.emit({id: this.comment._id, text});
            this.closeForm();
        });
    }

    closeForm(): void {
        this.formOpen = false;
        this.componentRef.destroy();
    }

    deleteComment() {
        this.deletedComment.emit(this.comment._id);
    }

    ngOnDestroy(): void {
        this.userSbs.unsubscribe();
    }
}
