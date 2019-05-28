import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {Workshop} from '../module/Workshop';
import {WorkshopService} from './workshop.service';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsResolverService implements Resolve<Array<Workshop>> {

  constructor(private wrkService: WorkshopService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Workshop>>
        | Promise<Array<Workshop>> | Array<Workshop> {
        return this.wrkService.getArticles();
    }
}
