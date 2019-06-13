import {Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ElementRef, Input, Renderer2} from '@angular/core';
import {fromEvent, Observable, Subscriber} from 'rxjs';
import {Scroll} from '@angular/router';
import {debounceTime, filter} from "rxjs/operators";

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToTopButtonComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() blockForScroll: ElementRef;
    @Input() scrollContainer: ElementRef;
    public scrollShow = false;
    scrollEvent$: Observable<any>;
    subscription: Subscriber<any>;
    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {

        this.scrollEvent$ = fromEvent(this.scrollContainer.nativeElement,
            'scroll')
            .pipe(
                debounceTime(200),
            );
        this.startSubs(this.scrollEvent$);

    }

    ngOnDestroy(): void {
        this.stopSubs();
    }

    startSubs(scrollEvent$: any): void {
        this.subscription = scrollEvent$.subscribe((evt: any) => {
          //  return evt.target.scrollTop;
        });
    }
    stopSubs(): void {
        this.subscription.unsubscribe();
    }

    toTop(): void {
        this.blockForScroll.nativeElement.scrollIntoView({
            behavior: 'smooth', block: 'center'
        });
        this.scrollShow = true;
    }
}
