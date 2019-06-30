import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[appQueryParamsActive]'
})
export class QueryParamsActiveDirective implements OnInit, OnDestroy {

    @Input() className = 'active';
    @Input() paramName: string;
    @Input() paramValue: string;

    private querySubscription: Subscription;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.querySubscription = this.route.queryParamMap.subscribe(
            (queryParam: any) => {
                const tags = queryParam.get(this.paramName);
                if (tags && tags.split(',').includes(this.paramValue + '')) {
                    this.renderer.addClass(this.elRef.nativeElement,
                        this.className);
                } else {
                    this.renderer.removeClass(this.elRef.nativeElement,
                        this.className);
                }
            });
    }
    ngOnDestroy(): void {
        this.querySubscription.unsubscribe();
    }
}
