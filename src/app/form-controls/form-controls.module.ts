import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {InputComponent} from './input/input.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [CheckboxComponent, InputComponent, DropdownComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [CheckboxComponent, InputComponent, DropdownComponent]
})
export class FormControlsModule {
}
