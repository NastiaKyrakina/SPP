import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {PostModel, WorkshopModel} from '../models/workshop.model';
import {WorkshopService} from './services/workshop.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopResolverService implements Resolve<PostModel> {

    constructor(private wrkService: WorkshopService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostModel>
        | Promise<PostModel> | PostModel {
        const id = route.paramMap.get('id');
        return this.wrkService.getWorkshop(id);
    }
}
