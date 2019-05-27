import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentRef, ComponentFactoryResolver
} from '@angular/core';

import {Comment} from 'src/app/module/additional';
import {User} from '../../module/User';
import {users} from '../../../data/data';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {currentUser} from '../../../data/data';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.pug',
    styleUrls: ['./comment-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent implements OnInit {
    @Input() comment: Comment;
    @ViewChild('commentForm', {read: ViewContainerRef}) form;
    user: User;
    current = currentUser;
    comtMenuOpened = false;
    formOpen = false;

    componentRef: ComponentRef<CommentFormComponent>;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.user = this.getUser();
    }

    getUser(): User {
        return users.filter(user => user.id == this.comment.userId)[0];
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
    }

    closeForm(): void {
        console.log(this.componentRef);
        this.formOpen = false;
        this.componentRef.destroy();

    }

}
