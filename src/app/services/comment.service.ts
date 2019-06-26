import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {CommentModel} from '../models/workshop.model';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private apiService: ApiService,
                private userService: UserService) {
    }

    getWrkComments(idWrk: string): Observable<Array<CommentModel>> {
        return this.apiService.getRequest(`/comments/${idWrk}`);
    }

    createComment(idWrk: string, text: string): Observable<any> {
        return this.apiService.postRequest(`/comments/${idWrk}`,
            {text});
    }

    updateComment(idWrk: string, idComment: string, text: string): Observable<any> {
        return this.apiService.putRequest(`/comments/${idWrk}/${idComment}`,
            {text});
    }

    deleteComment(idWrk: string, idComment: string): Observable<any> {
        return this.apiService.deleteRequest(`/comments/${idWrk}/${idComment}`);
    }

}
