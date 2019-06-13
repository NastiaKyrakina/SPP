import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {WorkshopModel} from '../../models/workshop.model';
import {Comment, Tag} from '../../models/additional.model';
import {WorkshopService} from '../workshop.service';
import {UsersService} from '../../root-service/users.service';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.pug',
    styleUrls: ['./workshop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent implements OnInit {

    private id: number;
    private subscription: Subscription;
    workshop: WorkshopModel;
    tags: Array<Tag>;
    auxOpen = false;
    currentUser: UserModel;
    likeIt: boolean;

    constructor(private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(params => this.id = params.id);
        this.route.data.subscribe((data: {workshop: WorkshopModel}) => {
            this.workshop = data.workshop;
        } );
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
        this.currentUser = this.usersService.getCurrentUser();
        this.tags = this.wrkService.getWrkTags(this.workshop.id);
        this.likeIt = this.wrkService.isUserLikeIt(this.workshop.id, this.currentUser.id);
    }

    liked($event: boolean): void {
        this.wrkService.liked($event, this.workshop.id);
    }

}
