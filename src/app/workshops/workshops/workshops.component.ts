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
import {TagsRequested, WorkshopDeleting, WorkshopsRequested} from '../store/workshops.actions';
import {selectTags, selectUsers, selectWorkshops} from '../store/workshops.selectors';
import {UserModel} from '../../models/user.model';
import {ConfirmPopupService} from '../../core/confirm-popup.service';

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
    ctgSelect: string;
    emptyPage = false;
    private querySubscription: Subscription;
    private tagsSbs: Subscription;
    users$: Observable<Array<UserModel>>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService,
                private tagService: TagsService,
                private userService: UserService,
                private popUpService: ConfirmPopupService,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.querySubscription = this.route.queryParamMap.subscribe(
            (queryParam: any) => {
                const tags = queryParam.get('tags');
                const category = queryParam.get('ctg');
                const page = queryParam.get('page') || '0';
                this.store.dispatch(new WorkshopsRequested({
                    page,
                    tags,
                    category
                }));
            });

        this.store.dispatch(new TagsRequested());
        this.users$ = this.store.pipe(select(selectUsers));
        this.tagsSbs = this.store.pipe(select(selectTags)).subscribe(
            tags => {
                this.tags = tags;
                this.tagsLoaded = true;
           }
        );
        this.workshops$ = this.store.pipe(select(selectWorkshops));
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

    addQueryParam(key: string, params: string | null): void {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {[key]: params},
                queryParamsHandling: 'merge',
            });
    }

    selectTag(tagId: number): void {
        const newTagList = this.getNewTagList(tagId);
        if (newTagList.length) {
            this.addQueryParam('tags', newTagList.toString());
        } else {
            this.addQueryParam('tags', null);
        }
    }

    selectCategory(category: string): void {
        this.ctgSelect = category;
        if (!category || category === 'All') {
            this.addQueryParam('ctg', null);
        } else {
            this.addQueryParam('ctg', category);
        }
    }

    loadArticles(): void {
        this.wrkService.page += 1;
        this.addQueryParam('page', this.wrkService.page + '');
    }

    deleteWorkshop($event: string): void {
        this.popUpService.confirm({
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
    }
}
