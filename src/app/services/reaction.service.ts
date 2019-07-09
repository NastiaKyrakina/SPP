import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../models/additional.model';
import {ApiService} from './api.service';
import {shareReplay} from 'rxjs/operators';
import {ReactionModel, ReactionTypes} from '../models/workshop.model';

@Injectable({
    providedIn: 'root'
})
export class ReactionService {

    constructor(private apiService: ApiService) {
    }

    getReactions(workshopId: string, withAuthorIds = 0): Observable<Array<ReactionModel>> {
        return this.apiService.getRequest(`/reactions/getreactions/${workshopId}/${withAuthorIds}`);
    }

    getMyReactions(type = 'all'): Observable<any> {
        return this.apiService.getRequest(`/reactions/getpostids/my/${type}`);
    }

    changeReactions(type: string, workshopId: string, withAuthorIds = 0): Observable<any> {
        return this.apiService.getRequest(`/reactions/toggle/${type}/${workshopId}/${withAuthorIds}`);
    }
}
