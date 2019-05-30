import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Workshop} from '../../module/Workshop';
import {UsersService} from '../../root-service/users.service';
import {User} from '../../module/User';
import {WorkshopService} from '../workshop.service';
import {Tag} from '../../module/additional';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() workshop: Workshop;
    tags: Array<Tag>;
    currentUser: User;
    likeIt: boolean;

    constructor(private usersService: UsersService,
                private wrkService: WorkshopService) {

    }

    ngOnInit() {
        this.tags = this.wrkService.getTags(this.workshop.id);
        this.currentUser = this.usersService.getCurrentUser();
        this.likeIt = this.wrkService.isUserLikeIt(this.workshop.id, this.currentUser.id);
    }

    liked($event: boolean): void {
        this.wrkService.liked($event, this.workshop.id);
    }


}
