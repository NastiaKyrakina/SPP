import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EmbeddedViewRef,
    Input,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormInputComponent} from '../form-input/form-input.component';
import {FormSelectComponent} from '../form-select/form-select.component';
import {FormButtonComponent} from '../form-button/form-button.component';
import {Field} from '../models/field.model';
import {FormCheckComponent} from '../form-check/form-check.component';
import {ConfigModel} from '../models/config.model';

const components = {
    input: FormInputComponent,
    select: FormSelectComponent,
    button: FormButtonComponent,
    check: FormCheckComponent,
};

@Directive({
    selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
    @Input() group: FormGroup;
    @Input() config: ConfigModel;
    private component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef) {
    }

    ngOnInit(): void {
        const componentEl = components[this.config.type];
        const factory = this.resolver.resolveComponentFactory<Field>(componentEl);
        this.component = this.container.createComponent(factory);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }

}
