import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfigModel} from '../models/config.model';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
    @Input()
    config: ConfigModel[] = [];
    form: FormGroup;
    @Output() submited = new EventEmitter<any>();

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup() {
        const group = this.fb.group({});
        this.config.forEach(control => {
            if (!control.value) {
                control.value = '';
            }
            console.log(control.value);
            group.addControl(control.name, this.fb.control(
                control.value));
        });
        return group;
    }

    onSubmit() {
        console.log(this.form.value);
        this.submited.emit(this.form.value);
    }
}
