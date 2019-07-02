import {Injectable} from '@angular/core';

import {PostModel, ReacrionModel, WorkshopModel} from '../../models/workshop.model';
import {Comment, Tag, WorkshopTag, Like} from '../../models/additional.model';
import {ActivatedRoute, Router} from '@angular/router';
import {currentUser, users} from '../../../data/data';
import {UserModel} from '../../models/user.model';
import {ApiService} from "../../services/api.service";
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {filter, first, map, shareReplay} from "rxjs/operators";
import {TagsService} from "../../services/tags.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../auth/auth.service";
import {Params} from "../../models/param.model";

export interface WorkshopParams extends Params {
    tags?: string;
}

@Injectable({
    providedIn: 'root',
})
export class WorkshopService {
    comments: Array<Comment>;
    workshops = new BehaviorSubject<Observable<Array<PostModel>>>(null);
    page = 0;
    pageCount: number;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private api: ApiService,
                private authService: AuthService,
                private tagsService: TagsService) {
    }

    getArticles(params: WorkshopParams = {page: this.page + ''}): void {
        const workshops$ = this.api.getRequest('/posts', params).pipe(
            first(),
            map(request => request.posts),
            map(posts => {
                return posts.map(post => {
                    post.likesCount = 0;
                    return post;
                });
            })
        );
        this.workshops.next(workshops$);
    }

    getWorkshop(id: string): Observable<any> {
        return this.api.getRequest(`/posts/${id}`)
            .pipe(first(),
                map(workshop => {
                     workshop.likesCount = 0;
                     return workshop;
                })
            );
    }

    getTags(wrksId: number[]): Observable<Array<Tag>> {
        const tags$ = this.tagsService.saveTags().pipe(
            map(tagsReq => {
                return tagsReq.filter(tag => wrksId.includes(tag.seq));
            })
        );
        return tags$;
    }

    isUserLikeIt(wrkId: number, userId: number): boolean {
        return false;
    }

    filterWorkshops(tagsId ?: string, ctg ?: string, page: string = '0'): void {
        const params: WorkshopParams = {
            page,
        };

        if (ctg === 'My') {
            params.authorId = this.authService.getId();
        }
        if (tagsId) {
            params.tags = tagsId.split(',').join('|');
        }
        this.getArticles(params);
    }
    liked(youLikeIt: boolean, wrkId: number): void {}

    isLastPage(): boolean {
        return false;
    }
}
