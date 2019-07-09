import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from '../../models/field.model';
import {ConfigModel} from '../../models/config.model';

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.pug',
    styleUrls: ['./form-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormButtonComponent implements Field, OnInit {
    config;
    group: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}
