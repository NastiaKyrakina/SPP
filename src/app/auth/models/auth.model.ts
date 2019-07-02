import {UserModel} from '../../models/user.model';

export interface AuthModel extends UserModel {
    token: string;
}
