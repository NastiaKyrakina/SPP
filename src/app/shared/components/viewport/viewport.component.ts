import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent implements OnInit {
    @ViewChild('top') topPoint: ElementRef;
    @ViewChild('main') mainArea: ElementRef;
    @Input() hasBackground = false;

    scrollPos: number;

    constructor() {
    }

    ngOnInit() {
        this.scrollPos = this.mainArea.nativeElement.scrollTop;
    }
}
