import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent implements OnInit {
    @ViewChild('top') topPoint: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

}
