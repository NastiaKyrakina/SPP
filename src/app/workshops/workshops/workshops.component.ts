import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {tags} from '../workshops-data/additional';
import {Tag} from '../../module/additional';
import {Workshop} from '../../module/Workshop';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopService} from "../workshop.service";

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopsComponent implements OnInit {
    tags: Array<Tag>;
    workshops: Array<Workshop>;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService) { }

    ngOnInit() {
        this.route.data.subscribe((data: {workshops: Array<Workshop>}) => {
            this.workshops = data.workshops;
        } );
        this.tags = this.wrkService.getTags();
    }

}
