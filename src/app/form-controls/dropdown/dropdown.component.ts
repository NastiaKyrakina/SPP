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

export interface Option {
    name: string;
    value: string;
}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.pug',
    styleUrls: ['./dropdown.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements ControlValueAccessor, OnInit {

    @ViewChild('customSelect') input: ElementRef;
    @Input() value: string | null = '1';
    @Input() id: string;
    @Input() label = '';
    @Input() placeholder = '';
    @Input() size = 1;
    @Input() disabled = false;
    @Input() options: Array<Option>;
    @Input() selectedOption;
    private optionChange = (value: string) => {
    };
    private selectTouch = () => {
    };

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.writeValue('1');
    }

    registerOnChange(fn: (value: string) => void): void {
        this.optionChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.selectTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.input.nativeElement, 'disabled', this.disabled);
    }

    writeValue(option: any): void {
        console.log(option);
        this.selectedOption = option;
        this.value = option;
        this.optionChange(this.value);
    }

    private onTouch($event: TouchEvent): void {
        this.selectTouch();
    }

    selectOption(value: string) {
        this.writeValue(this.value);
    }
}
