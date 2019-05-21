import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-workshops',
    templateUrl: './workshops.component.pug',
    styleUrls: ['./workshops.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
