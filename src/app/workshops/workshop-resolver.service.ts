import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {Workshop} from '../module/Workshop';
import {WorkshopService} from './workshop.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopResolverService implements Resolve<Workshop> {

    constructor(private wrkService: WorkshopService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Workshop>
        | Promise<Workshop> | Workshop {
        const id = +route.paramMap.get('id');
        return this.wrkService.getWorkshop(id);
    }
}
