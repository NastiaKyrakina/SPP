import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../models/field.model';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.pug',
    styleUrls: ['./form-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent implements Field, OnInit {
    config;
    group: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}
