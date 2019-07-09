import {Injectable} from '@angular/core';

import {ReactionModel, WorkshopModel} from '../../models/workshop.model';
import {Comment, Tag, WorkshopTag, Like} from '../../models/additional.model';
import {ActivatedRoute, Router} from '@angular/router';
import {currentUser, users} from '../../../data/data';
import {UserModel} from '../../models/user.model';
import {ApiService} from '../../services/api.service';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, first, map, shareReplay} from 'rxjs/operators';
import {TagsService} from '../../services/tags.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../auth/auth.service';
import {Params} from '../../models/param.model';

export interface WorkshopParams extends Params {
    tags?: string;
}

export interface WorkshopResponse {
    total: string;
    offset: string;
    posts: Array<WorkshopModel>;
    page: string;
}

@Injectable({
    providedIn: 'root',
})
export class WorkshopService {
    comments: Array<Comment>;
    page = 0;
    pageCount: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private api: ApiService,
                private authService: AuthService,
                private tagsService: TagsService) {
    }

    getArticles(params: WorkshopParams = {page: this.page + ''}): Observable<WorkshopResponse> {
        return this.api.getRequest('/posts', params);
    }

    getWorkshop(id: string): Observable<WorkshopModel> {
        return this.api.getRequest(`/posts/${id}`)
            .pipe(first(),
                map(workshop => {
                    workshop.likesCount = 0;
                    return workshop;
                })
            );
    }

    getTags(workshopsId: number[]): Observable<Array<Tag>> {
        const tags$ = this.tagsService.saveTags().pipe(
            map(tagsReq => {
                return tagsReq.filter(tag => workshopsId.includes(tag.seq));
            })
        );
        return tags$;
    }

    isUserLikeIt(workshopId: number, userId: number): boolean {
        return false;
    }

    filterWorkshops(tagsId ?: string, ctg ?: string, page: string = '0'): Observable<WorkshopResponse> {
        const params: WorkshopParams = {
            page,
        };

        if (ctg === 'My') {
            params.authorId = this.authService.getId();
        }
        if (tagsId) {
            params.tags = tagsId.split(',').join('|');
        }
        return this.getArticles(params);
    }

    liked(youLikeIt: boolean, workshopId: number): void {
    }

    isLastPage(): boolean {
        return false;
    }

    creatWorkshop(workshop: Partial<WorkshopModel>): Observable<any> {
        return this.api.postRequest(`/posts`,
            workshop);
    }

    updateWorkshop(workshopId: string, workshop: Partial<WorkshopModel>): Observable<any> {
        return this.api.putRequest(`/posts/${workshopId}`,
            workshop);
    }

    deleteWorkshop(workshopId: string): Observable<any> {
        return this.api.deleteRequest(`/posts/${workshopId}`);
    }
}
