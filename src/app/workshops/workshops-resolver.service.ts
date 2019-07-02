import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {PostModel, WorkshopModel} from '../models/workshop.model';
import {WorkshopService} from './services/workshop.service';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class WorkshopsResolverService implements Resolve<Array<PostModel>> {

    constructor(private wrkService: WorkshopService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<PostModel>>
        | Promise<Array<PostModel>> | Array<PostModel> {
        this.wrkService.getArticles();
        return this.wrkService.workshops.getValue();
    }
}
