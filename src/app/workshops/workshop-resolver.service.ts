import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {WorkshopModel} from '../models/workshop.model';
import {WorkshopService} from './workshop.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopResolverService implements Resolve<WorkshopModel> {

    constructor(private wrkService: WorkshopService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkshopModel>
        | Promise<WorkshopModel> | WorkshopModel {
        const id = +route.paramMap.get('id');
        return this.wrkService.getWorkshop(id);
    }
}
