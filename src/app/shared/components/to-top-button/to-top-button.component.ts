import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ElementRef,
    Input,
    Renderer2, ChangeDetectorRef
} from '@angular/core';
import {fromEvent, interval as scrollInterval, Subscription} from 'rxjs';
import {debounceTime, filter, map, scan, takeWhile, tap} from 'rxjs/operators';

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToTopButtonComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() scrollContainer: ElementRef;
    public scrollShow = false;
    subscription: Subscription;

    constructor(private renderer: Renderer2,
                private changes: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.subscription = fromEvent(this.scrollContainer.nativeElement,
            'scroll')
            .pipe(
                debounceTime(200),
                map((evt: Event) => (evt.target as HTMLDivElement).scrollTop),
                filter(position => !this.scrollShow || (this.scrollShow && position === 0))
            ).subscribe((position: number) => {
                if (!position) {
                    this.scrollShow = false;
                } else {
                    this.scrollShow = true;
                }
                this.changes.detectChanges();
            });
    }

    toTop(): void {
        this.scrollToTop(this.scrollContainer.nativeElement);
    }

    scrollToTop(el): void {
        const duration = 600;
        const interval = 5;
        const move = el.scrollTop * interval / duration;
        scrollInterval(interval).pipe(
            scan((acc, curr) => acc - move, el.scrollTop),
            tap(position => el.scrollTop = position),
            takeWhile(position => position > 0)).subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
