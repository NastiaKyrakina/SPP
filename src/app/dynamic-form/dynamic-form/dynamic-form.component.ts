import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
    @Input()
    config: any[] = [];
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup() {
        const group = this.fb.group({});
        this.config.forEach(control =>
            group.addControl(control.name, this.fb.control(
                {value: ''})));
        return group;
    }
}
