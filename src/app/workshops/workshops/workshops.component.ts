import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';

import {Tag} from '../../models/additional.model';
import {WorkshopModel} from '../../models/workshop.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopService} from '../services/workshop.service';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {TagsService} from '../../services/tags.service';
import {UserService} from '../../services/user.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {TagsRequested, WorkshopDeleting, WorkshopsCleanLoaded, WorkshopsRequested} from '../store/workshops.actions';
import {
    selectIsLastPage,
    selectOffset,
    selectTags,
    selectTotal,
    selectUsers,
    selectWorkshops, selectWorkshopsIsLoaded
} from '../store/workshops.selectors';
import {UserModel} from '../../models/user.model';
import {CONFIRM, PopupService} from '../../core/popup.service';

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopsComponent implements OnInit, OnDestroy {
    workshops$: Observable<Array<WorkshopModel>>;
    tags: Array<Tag> | null = null;
    tagsLoaded = false;
    ctgList = ['All', 'Favorite', 'My'];
    defaultCtg = this.ctgList[0];
    ctgSelect: string;
    emptyPage = false;
    private querySubscription: Subscription;
    private tagsSbs: Subscription;
    users$: Observable<Array<UserModel>>;
    isLastPage$: Observable<boolean>;

    prevPage = '0';
    prevCtg = this.defaultCtg;
    prevTags: string | null = null;
    isLoaded$: Observable<boolean>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService,
                private tagService: TagsService,
                private userService: UserService,
                private popUpService: PopupService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.querySubscription = this.route.queryParamMap.subscribe(
            (queryParam: any) => {
                const tags = queryParam.get('tags');
                const category = queryParam.get('ctg');
                const page = queryParam.get('page') || '0';
                console.log(tags);
                if (!category) {
                    this.selectCategory(this.defaultCtg);
                }
                this.store.dispatch(new WorkshopsRequested({
                    page,
                    tags,
                    category
                }));
                this.prevPage = page;
                this.prevCtg = category;
                this.prevTags = tags;
            });

        this.store.dispatch(new TagsRequested());
        this.users$ = this.store.pipe(select(selectUsers));
        this.isLastPage$ = this.store.pipe(select(selectIsLastPage));

        this.tagsSbs = this.store.pipe(select(selectTags)).subscribe(
            tags => {
                this.tags = tags;
                this.tagsLoaded = true;
            }
        );
        this.workshops$ = this.store.pipe(select(selectWorkshops));
        this.isLoaded$ = this.store.pipe(select(selectWorkshopsIsLoaded));
        this.store.pipe(select(selectWorkshopsIsLoaded)).subscribe(v => {
            console.log(v);
        });
        const currentTags = this.route.snapshot
            .queryParamMap.get('tags');
        this.ctgSelect = this.ctgList[0];
    }

    getCurrentTags(): string[] {
        const currentTags = this.route.snapshot.queryParamMap.get('tags');
        if (currentTags) {
            return currentTags.split(',');
        }
        return [];
    }

    getNewTagList(tagId: number): string[] | null {
        const currentTagList: string[] = this.getCurrentTags();
        let newTagList: string[] = [];
        if (currentTagList) {
            newTagList = currentTagList.filter(cTagId => +cTagId !== tagId);
        }
        if (newTagList.length === currentTagList.length) {
            newTagList.push(tagId + '');
        }
        return newTagList;
    }

    addQueryParam(params): void {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {...params},
                queryParamsHandling: 'merge',
            });
    }

    selectTag(tagId: number): void {
        const newTagList = this.getNewTagList(tagId);
        if (newTagList.length) {
            this.addQueryParam({tags: newTagList.toString(),
                                        page: null});
        } else {
            this.addQueryParam({tags: null});
        }
    }

    selectCategory(category: string): void {
        this.ctgSelect = category;
        if (!category) {
            this.addQueryParam({ctg: null});
        } else {
            this.addQueryParam({ctg: category, page: null});
        }
    }

    loadArticles(): void {
        this.wrkService.page += 1;
        this.addQueryParam({page: this.wrkService.page + ''});
    }

    deleteWorkshop($event: string): void {
        this.popUpService.confirm({
            type: CONFIRM,
            data: {
                title: 'Delete workshop',
                text: 'Do you really want to delete this workshop?',
            }
        }).subscribe((confirmed: boolean) => {
            this.store.dispatch(new WorkshopDeleting({workshopId: $event}));
        });
    }

    ngOnDestroy(): void {
        this.querySubscription.unsubscribe();
        this.tagsSbs.unsubscribe();
        this.store.dispatch(new WorkshopsCleanLoaded());
    }
}
