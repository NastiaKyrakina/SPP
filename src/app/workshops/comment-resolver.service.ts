import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {CommentModel} from '../models/workshop.model';
import {WorkshopService} from './services/workshop.service';
import {CommentService} from '../services/comment.service';

@Injectable({
    providedIn: 'root',
})
export class CommentResolverService implements Resolve<Array<CommentModel>> {

    constructor(private commentService: CommentService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<CommentModel>>
        | Promise<Array<CommentModel>> | Array<CommentModel> {
        const id = route.parent.paramMap.get('id');
        return this.commentService.getWrkComments(id);
    }
}
