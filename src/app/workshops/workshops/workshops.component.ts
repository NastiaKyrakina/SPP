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
import {TagsRequested, WorkshopsRequested} from '../store/workshops.actions';
import {selectTags, selectWorkshops} from '../store/workshops.selectors';

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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService,
                private tagService: TagsService,
                private userService: UserService,
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
        this.store.pipe(select(selectTags)).subscribe(
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

    ngOnDestroy(): void {
        this.querySubscription.unsubscribe();
    }

    loadArticles(): void {
        this.wrkService.page += 1;
        this.addQueryParam('page', this.wrkService.page + '');
    }
}
