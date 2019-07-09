import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[appMark]'
})
export class MarkDirective implements OnInit {
    @Input() classes = [
        'susses',
        'almost',
        'fail'
        ];
    @Input() all: number;
    @Input() correct: number;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
        const ratio = this.correct / this.all;
        this.renderer.addClass(this.elRef.nativeElement,
            this.getClass(ratio));
    }

    getClass(ratio: number): string {
        const type = ratio === 1 ? 0 : ratio >= 0.5 ? 1 : 2;
        return this.classes[type];
    }

}
