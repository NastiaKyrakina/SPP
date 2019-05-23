import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentFactory, ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import {Comment} from 'src/app/module/additional';
import {User} from '../../../module/user';
import {users} from '../../../data/data';
import {CommentFormComponent} from '../comment-form/comment-form.component';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.pug',
    styleUrls: ['./comment-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent implements OnInit {
    @Input() comment: Comment;
    @ViewChild('commentForm', { read: ViewContainerRef }) form;
    user: User;
    comtMenuOpened = false;

    componentRef: ComponentRef<CommentFormComponent>;
    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.user = this.getUser();
        console.log(this.comment);
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
    }

}
