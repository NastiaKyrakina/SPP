import {
    Directive, ElementRef,
    Input,
    OnInit,
    AfterViewInit,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style} from '@angular/animations';


@Directive({
    selector: '[appCollapsable]'
})
export class CollapsableDirective implements OnInit, AfterViewInit {
    contect: any = null;
    private player: AnimationPlayer;
    initialHeight = '100%';
    isViewInit = false;
    private pState: 'collapsed' | 'extended';

    @Input('appCollapsableHeight') height: string;
    @Input('appCollapsableAnimation') animation: 'on' | 'off' = 'on';

    @Input('appCollapsableSet')
    set state(state: 'collapsed' | 'extended') {
        this.pState = state;
        if (this.isViewInit) {
            this.contect.$implicit = state;
            if (this.animation === 'on') {
                if (this.player) {
                    this.player.destroy();
                }
                const metadata = state === 'collapsed' ? this.collapsed() : this.expanded();
                const factory = this.builder.build(metadata);
                const player = factory.create(this.elRef.nativeElement.nextSibling);

                player.play();
            } else {
                const newHeight = state === 'extended' ? this.initialHeight : this.height;
                this.renderer.setStyle(this.elRef.nativeElement.nextSibling, 'height', newHeight);
            }
        }
    }

    get state(): 'collapsed' | 'extended' {
        return this.pState;
    }

    constructor(private elRef: ElementRef,
                private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private renderer: Renderer2,
                private builder: AnimationBuilder) {
    }

    ngOnInit(): void {
       this.contect = {
            $implicit: this.state,
            controller: {
                collapse: () => this.collapse(),
                expand: () => this.expand()
            }
        };
        this.viewContainer.createEmbeddedView(this.templateRef, this.contect);

    }

    ngAfterViewInit(): void {
        this.isViewInit = true;
        if (this.state === 'collapsed') {
            this.renderer.setStyle(this.elRef.nativeElement.nextSibling, 'height', this.height);
        }
    }

    collapse(): void {
        this.state = 'collapsed';
    }

    expand(): void {

        this.state = 'extended';
    }

    private collapsed(): AnimationMetadata[] {

        return [
            style({height: '*'}),
            animate('400ms ease-in', style({height: this.height})),
        ];
    }

    private expanded(): AnimationMetadata[] {
        return [
            style({height: '*'}),
            animate('400ms ease-in', style({height: this.initialHeight})),
        ];
    }
}
