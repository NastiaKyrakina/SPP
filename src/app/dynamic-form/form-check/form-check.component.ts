import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../models/field.model';

@Component({
    selector: 'app-form-check',
    templateUrl: './form-check.component.pug',
    styleUrls: ['./form-check.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCheckComponent implements OnInit, Field {
    config;
    group: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}
