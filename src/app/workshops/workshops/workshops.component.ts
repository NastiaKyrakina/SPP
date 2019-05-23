import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {workshops} from '../workshops-data/data';
import {tags} from '../workshops-data/additional';
import {Tag} from '../../module/additional';
import {Workshop} from '../../module/Workshop';

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsComponent implements OnInit {
    workshops: Array<Workshop> = workshops;
    tags: Array<Tag> = tags;

    constructor() {
    }

    ngOnInit() {
    }

}
