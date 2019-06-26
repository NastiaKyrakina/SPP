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

const components = {
    input: FormInputComponent,
    select: FormSelectComponent,
    button: FormButtonComponent,
};

@Directive({
    selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
    @Input() group: FormGroup;
    @Input() config: any;
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
