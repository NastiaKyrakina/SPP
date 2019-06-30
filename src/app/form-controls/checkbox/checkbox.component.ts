import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    Input,
    Renderer2,
    forwardRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.pug',
    styleUrls: ['./checkbox.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
    @ViewChild('customCheck') input: ElementRef;
    @Input() value: string | null = null;
    @Input() label = '';
    @Input() disabled = false;
    @Input() id: string;
    @Input() groupName: string;
    isChecked = false;

    private inputChange = (value: string) => {
    };
    private inputTouch = ($event: TouchEvent) => {
    };

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    registerOnChange(fn: (value: string) => void): void {
        this.inputChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.inputTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.input.nativeElement, 'disabled', this.disabled);
    }

    writeValue(value: any): void {
        this.value = value;
    }

    onChange(value: string): void {
        this.inputChange(value);
        this.isChecked = !this.isChecked;
    }

    private onTouch($event: TouchEvent): void {
        this.inputTouch($event);
    }
}
