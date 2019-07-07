import {Pipe, PipeTransform} from '@angular/core';
import {filter, first} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';

@Pipe({
    name: 'author'
})
export class AuthorPipe implements PipeTransform {

    transform(users: Array<UserModel>, author, args?: any): UserModel | null {
        if (users) {
            return users.filter(user => {
                return user.id === author;
            })[0];
        }
        return null;
    }
}
