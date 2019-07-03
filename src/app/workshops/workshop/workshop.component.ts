import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {WorkshopModel} from '../../models/workshop.model';
import {Comment, Tag} from '../../models/additional.model';
import {WorkshopService} from '../services/workshop.service';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {TabModel} from '../../models/tab.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {WorkshopRequested} from '../store/workshops.actions';
import {selectWorkshop} from '../store/workshops.selectors';

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
    private id: string;
    private subscription: Subscription;
   // workshop: WorkshopModel;
    workshop$: Observable<WorkshopModel>;
    tags$: Observable<Array<Tag>>;
    auxOpen = false;
    currentUser: UserModel;
    likeIt = false;
    private routeSbs: Subscription;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(params => {
                this.id = params.id;
                this.store.dispatch(new WorkshopRequested({workshopId: this.id}));
            });
        // this.routeSbs = this.route.data.subscribe((data: { workshop: WorkshopModel }) => {
        //     this.workshop = data.workshop;
        // });

        this.workshop$ = this.store.pipe(select(selectWorkshop));
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
       // this.tags$ = this.wrkService.getTags(this.workshop.tags);
        this.tags$ = of([]);
    }

    liked($event: boolean): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
       // this.routeSbs.unsubscribe();
    }

}
