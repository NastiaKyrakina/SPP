import {Component, OnInit, ChangeDetectionStrategy, ElementRef, Input} from '@angular/core';

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToTopButtonComponent implements OnInit {
    @Input() blockForScroll: ElementRef;
    @Input() scrollPos: number;

    constructor() {
    }

    ngOnInit() {
    }

    toTop(): void {
        this.blockForScroll.nativeElement.scrollIntoView({
            behavior: 'smooth', block: 'center'
        });
    }
}
