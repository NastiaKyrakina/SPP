import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    forwardRef,
    Renderer2,
    ViewChild,
    ElementRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.pug',
    styleUrls: ['./input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor, OnInit {
    @ViewChild('customInput') input: ElementRef;
    @Input() value: string;
    @Input() type = 'text';
    @Input() maxLength = 255;
    @Input() minLength = 0;
    @Input() max = '';
    @Input() min = '';
    @Input() placeholder = '';
    @Input() label = '';
    @Input() disabled = false;
    @Input() id: string;
    private inputChange = (value: string) => {
    };
    private inputTouch = ($event: TouchEvent) => {
    };

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.input.nativeElement, 'disabled', this.disabled);
    }

    writeValue(value: any): void {
        console.log(value);
        this.value = value;
    }

    onChange(value: string): void {
        this.inputChange(value);
    }

    private onTouch($event: TouchEvent): void {
        this.inputTouch($event);
    }
}
