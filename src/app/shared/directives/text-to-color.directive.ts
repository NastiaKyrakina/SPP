import {Directive, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appTextToColor]'
})
export class TextToColorDirective implements OnInit {
    @Input()
    colorMap = [
        '#FF0000',
        '#FF8900',
        '#B70094',
        '#008500'
    ];
    colorCount: number;
    curColor: string;

    @Input()
    set text(text: string) {
        this.colorCount = this.colorMap.length;
        this.renderer.setStyle(this.elRef.nativeElement,
            'background-color',
            this.getColor(text)
        );
        this.curColor = this.getColor(text);
        this.renderer.setStyle(this.elRef.nativeElement,
            'background-color',
            this.curColor
        );
    }

    constructor(private elRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.renderer.listen(this.elRef.nativeElement, 'click', () => {
            this.hoverEl();
        });
    }

    hoverEl(): void {
        console.log('hover');
        this.renderer.setStyle(this.elRef.nativeElement,
            'background-color',
            `darken(${this.curColor}, 100%)`,
        );

    }

    private convertToNum(str: string): number {
        let num = 0;
        for (let i = 0; i < str.length; i++) {
            num += str.charCodeAt(i);
        }
        return num % this.colorCount;
    }

    private getColor(str: string): string {
        return this.colorMap[this.convertToNum(str)];
    }
}
