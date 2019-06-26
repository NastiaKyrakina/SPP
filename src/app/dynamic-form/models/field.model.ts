import {FormGroup} from '@angular/forms';
import {ConfigModel} from './config.model';

export interface Field {
    config: ConfigModel;
    group: FormGroup;
}
