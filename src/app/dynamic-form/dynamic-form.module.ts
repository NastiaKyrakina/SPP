import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {FormInputComponent} from './form-input/form-input.component';
import {FormSelectComponent} from './form-select/form-select.component';
import {FormButtonComponent} from './form-button/form-button.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';

@NgModule({
    declarations: [DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormControlsModule,
    ],
    exports: [DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective],
    entryComponents: [
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
    ]
})
export class DynamicFormModule {
}
