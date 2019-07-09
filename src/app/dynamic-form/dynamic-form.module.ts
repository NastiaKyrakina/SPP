import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {FormInputComponent} from './components/form-input/form-input.component';
import {FormSelectComponent} from './components/form-select/form-select.component';
import {FormButtonComponent} from './components/form-button/form-button.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import { FormCheckComponent } from './components/form-check/form-check.component';

@NgModule({
    declarations: [DynamicFormComponent,
        FormInputComponent,
        FormSelectComponent,
        FormButtonComponent,
        DynamicFieldDirective,
        FormCheckComponent],
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
