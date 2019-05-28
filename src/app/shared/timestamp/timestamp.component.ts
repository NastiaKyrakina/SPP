import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'app-timestamp',
    templateUrl: './timestamp.component.pug',
    styleUrls: ['./timestamp.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimestampComponent implements OnInit {
    @Input() timestamp: any;
    @Input() onlyDate: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
