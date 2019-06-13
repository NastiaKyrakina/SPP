import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent implements OnInit {
    @ViewChild('top') topPoint: ElementRef;
    @ViewChild('main') mainArea: ElementRef;
    scrollPos: number;

    constructor() {
    }

    ngOnInit() {
        this.scrollPos = this.mainArea.nativeElement.scrollTop;
    }

    detectScrollPosition(): void {
        this.scrollPos = this.mainArea.nativeElement.scrollTop;
    }
}
