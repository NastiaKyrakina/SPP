import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../models/field.model';

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.pug',
    styleUrls: ['./form-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements Field, OnInit {
    config;
    group: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}
