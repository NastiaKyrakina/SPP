import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';

import {Tag} from '../../models/additional.model';
import {PostModel, WorkshopModel} from '../../models/workshop.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopService} from '../services/workshop.service';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {TagsService} from '../../services/tags.service';
import {UserService} from '../../services/user.service';
import {first} from "rxjs/operators";

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
   // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopsComponent implements OnInit, OnDestroy {
    tags$: Observable<Array<Tag>>;
    workshops: Array<PostModel>;
    private querySubscription: Subscription;
    private paramsList = [];
    ctgList = ['All', 'Favorite', 'My'];
    ctgSelect: string;
    private wrkSbsc: Subscription;
    private routeSubs: Subscription;
    workshopsSubj = new ReplaySubject<Array<PostModel>>(1);
    isFirst = true;
    emptyPage = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService,
                private tagService: TagsService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.wrkSbsc = this.wrkService.workshops.asObservable().subscribe(
            workshops$ => {
                workshops$.subscribe(wrk => {
                    this.workshops = wrk;
                    this.emptyPage = this.workshops.length ? false : true;
                });
            }
        );
        this.tags$ = this.tagService.getAllTags();
        const currentTags = this.route.snapshot
            .queryParamMap.get('tags');
        this.querySubscription = this.route.queryParamMap.subscribe(
            (queryParam: any) => {
                const tags = queryParam.get('tags');
                const ctg = queryParam.get('ctg');
                const page = queryParam.get('page') || '0';
                this.wrkService.filterWorkshops(tags, ctg, page);
            });
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
        this.wrkSbsc.unsubscribe();
    }

    loadArticles(): void {
        this.wrkService.page += 1;
        this.addQueryParam('page', this.wrkService.page + '');
    }
}
