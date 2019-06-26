import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Field} from "../models/field.model";

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.pug',
    styleUrls: ['./form-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormButtonComponent implements Field, OnInit {
    config: any;
    group: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

}
