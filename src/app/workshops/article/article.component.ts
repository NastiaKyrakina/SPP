import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {WorkshopModel} from '../../models/workshop.model';
import {UsersService} from '../../root-service/users.service';
import {UserModel} from '../../models/user.model';
import {WorkshopService} from '../workshop.service';
import {Tag} from '../../models/additional.model';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

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
export class ArticleComponent implements OnInit {
    @Input() workshop: WorkshopModel;
    tags: Array<Tag>;
    currentUser: UserModel;
    likeIt: boolean;
    desc: string;


    isOpen = true;

    constructor(private usersService: UsersService,
                private wrkService: WorkshopService) {

    }

    ngOnInit() {
        this.tags = this.wrkService.getWrkTags(this.workshop.id);
        this.currentUser = this.usersService.getCurrentUser();
        this.likeIt = this.wrkService.isUserLikeIt(this.workshop.id, this.currentUser.id);
        this.desc = this.wrkService.getShordDescr(this.workshop.id);
    }

    liked($event: boolean): void {
        this.wrkService.liked($event, this.workshop.id);
    }

    changeState(): void {
        this.isOpen = !this.isOpen;
    }
}
