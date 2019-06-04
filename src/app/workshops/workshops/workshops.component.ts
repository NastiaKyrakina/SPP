import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {tags} from '../workshops-data/additional';
import {Tag} from '../../module/additional';
import {Workshop} from '../../module/Workshop';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopService} from '../workshop.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopsComponent implements OnInit {
    tags: Array<Tag>;
    workshops: Array<Workshop>;
    private querySubscription: Subscription;
    private paramsList = [];
    ctgList = ['All', 'Favorite', 'My'];
    ctgSelect: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: { workshops: Array<Workshop> }) => {
            this.workshops = data.workshops;
        });

        this.tags = this.wrkService.getTags();
        const currentTags = this.route.snapshot
            .queryParamMap.get('tags');
        if (currentTags) {
            const currentTagList = currentTags.split(',').sort();
            let i = 0;
            for (let tag of this.tags) {
                if (tag.id === +currentTagList[i]) {
                    tag.selected = true;
                    i++;
                }
            }
        }
        this.querySubscription = this.route.queryParamMap.subscribe(
            (queryParam: any) => {
                let tags = queryParam.get('tags');
                let ctg = queryParam.get('ctg');
                this.workshops = this.wrkService.filterWorkshops(tags, ctg);
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
        if (newTagList) {
            console.log(newTagList);
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
}
