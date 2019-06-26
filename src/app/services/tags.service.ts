import {Injectable} from '@angular/core';
import {forkJoin, Observable, ReplaySubject} from 'rxjs';
import {CommentModel} from '../models/workshop.model';
import {ApiService} from './api.service';
import {Tag} from '../models/additional.model';
import {filter, map, shareReplay, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagsService {

    tags$: Observable<Array<Tag>>;
    private tagLoaded = false;

    constructor(private apiService: ApiService) {
    }

    getAllTags(): Observable<Array<Tag>> {
        return this.apiService.getRequest(`/tags/all`);
    }

    saveTags(): Observable<Array<Tag>> {
        if (!this.tags$) {
            this.tags$ = this.getAllTags().pipe(shareReplay(1));
        }
        return this.tags$;
    }

    getMyTags(): Observable<Array<Tag>> {
        return this.apiService.getRequest(`/tags/my`);
    }

    getTag(idTag: string): Observable<Tag> {
        return this.apiService.getRequest(`/tags/${idTag}`);
    }

    createTag(name: string): Observable<any> {
        return this.apiService.postRequest(`/tags`,
            {name});
    }

    deleteTag(idTag: string): Observable<any> {
        return this.apiService.deleteRequest(`/tags/${idTag}`);
    }
}
