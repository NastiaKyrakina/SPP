import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {PostModel, WorkshopModel} from '../../models/workshop.model';
import {Comment, Tag} from '../../models/additional.model';
import {WorkshopService} from '../workshop.service';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {TabModel} from '../../models/tab.model';

const tabsList = [
    {
        title: 'Comments',
        href: 'comments',
    },
    {
        title: 'Resources',
        href: 'resources',
    },
    {
        title: 'Quizzes',
        href: 'quizzes',
    },
];

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.pug',
    styleUrls: ['./workshop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent implements OnInit, OnDestroy {
    tabs: Array<TabModel> = tabsList;
    private id: number;
    private subscription: Subscription;
    workshop: PostModel;
    tags$: Observable<Array<Tag>>;
    auxOpen = false;
    currentUser: UserModel;
    likeIt = false;
    private routeSbs: Subscription;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(params => this.id = params.id);
        this.routeSbs = this.route.data.subscribe((data: { workshop: PostModel }) => {
            this.workshop = data.workshop;
        });
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
        this.tags$ = this.wrkService.getTags(this.workshop.tags);
    }

    liked($event: boolean): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.routeSbs.unsubscribe();
    }

}
