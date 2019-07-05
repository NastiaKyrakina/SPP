import {Option} from '../../form-controls/dropdown/dropdown.component';

export interface ConfigModel {
    name: string;
    type: string;
    id: string;
    label?: string;
    placeholder?: string;
    value?: string;
    options?: Array<Option>;
}
