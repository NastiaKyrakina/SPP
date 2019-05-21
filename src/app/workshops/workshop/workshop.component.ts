import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.pug',
    styleUrls: ['./workshop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
