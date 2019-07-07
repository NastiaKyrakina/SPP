import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appTextToColor]'
})
export class TextToColorDirective implements OnInit, OnDestroy {
    @Input()
    colorMap = [
        '#FF0000',
        '#FF8900',
        '#B70094',
        '#008500'
    ];
    @Input() disabled = false;
    @Input()
    set hoverEffect(hoverEffect: 'on' | 'off') {
        const prevState = this.canHover;
        this.canHover = hoverEffect === 'on';
        if (!this.disabled) {
            if (this.canHover && !prevState) {
                this.mouseEnterLst = this.renderer.listen
                (this.elRef.nativeElement, 'mouseenter', () => {
                    this.hoverEl();
                });
                this.mouseLeaveLst = this.renderer.listen
                (this.elRef.nativeElement, 'mouseleave', () => {
                    this.mouseUn();
                });
            }
            if (!this.canHover && prevState) {
                this.mouseEnterLst();
                this.mouseLeaveLst();
            }
        }
    }
    @Input()
    set effectType(type: 'darken' | 'lighten') {
        if (type === 'darken') {
            this.percentChange = -1 * this.percentChange;
        } else {
            this.percentChange = Math.abs(this.percentChange);
        }
    }

    @Input()
    set text(text: string) {
        this.colorCount = this.colorMap.length;
        this.curColor = this.hexToHsl(this.getColor(text));
        if (!this.disabled) {
            this.renderer.setStyle(this.elRef.nativeElement,
                'background-color',
                `hsl(${this.curColor[0]}, ${this.curColor[1]}%, ${this.curColor[2]}%)`
            );
        } else {
            this.renderer.setStyle(this.elRef.nativeElement,
                'background-color',
                `grey`
            );
        }
    }

    private canHover = false;
    private colorCount: number;
    private curColor: number[];
    private percentChange = 15;
    private mouseEnterLst: () => void;
    private mouseLeaveLst: () => void;

    constructor(private elRef: ElementRef,
                private renderer: Renderer2) {
    }

    ngOnInit(): void {
    }

    private hoverEl(): void {
        this.renderer.setStyle(this.elRef.nativeElement,
            'background-color',
            `hsl(${this.curColor[0]}, ${this.curColor[1]}%, ${this.curColor[2] + this.percentChange}%)`
        );
    }

    private mouseUn(): void {
        this.renderer.setStyle(this.elRef.nativeElement,
            'background-color',
            `hsl(${this.curColor[0]}, ${this.curColor[1]}%, ${this.curColor[2]}%)`
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

    private hexToHsl(hexColor: string): number[] {
        let H, L, S;
        const r = parseInt(hexColor.substr(1, 2), 16) / 255;
        const g = parseInt(hexColor.substr(3, 2), 16) / 255;
        const b = parseInt(hexColor.substr(5, 2), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const del = max - min;
        if (max !== min) {
            switch (max) {
                case r: {
                    H = (g - b) / del + (g < b ? 6 : 0);
                    break;
                }
                case g: {
                    H = (b - r) / del + 2;
                    break;
                }
                case b: {
                    H = (r - g) / del + 4;
                    break;
                }
            }
            H = Math.round(360 * (H / 6));
        } else {
            H = 0;
        }
        L = ((max + min) / 2);
        S = L > 0.5 ? del / (2 - max - min) : del / (max + min);
        L = Math.round(L * 1000) / 10;
        S = Math.round(S * 1000) / 10;
        return [H, S, L];
    }

    ngOnDestroy(): void {
        // remove event listeners
        this.hoverEffect = 'off';
    }
}
