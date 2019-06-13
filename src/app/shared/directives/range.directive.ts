import {Directive, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appRange]'
})
export class RangeDirective implements OnInit {
    contect: any;
    start = 0;
    end: number;

    @Input('appRangeSet')
    set range(range: number[] | number) {
        console.log(range);
        this.viewContainer.clear();

        if (typeof (range) === 'object') {
            this.start = range[0];
            this.end = range[1];
        } else {
            this.end = range;
        }
        this.contect = {};
        const count = this.end - this.start;
        let curNumber = this.start;
        for (let i = 0; i < count; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                index: i,
                number: curNumber++,
            });
        }
    }

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) {
    }

    ngOnInit(): void {}
}
