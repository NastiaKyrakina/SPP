import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpHeaders} from '@angular/common/http';
import {PrivateDataModel, UserModel} from '../models/user.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from "../auth/auth.service";
import {AuthModel} from '../auth/models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser = new BehaviorSubject<UserModel | null>(null);

    constructor(private apiService: ApiService) {
    }

    setHeaders({username, password}: PrivateDataModel) {
        return new HttpHeaders().set('Authorization',
            `Basic ${btoa(username + ':' + password)}`);
    }

    singIn(data: PrivateDataModel) {
        let headers = this.setHeaders(data);
        headers = headers.append('Username', data.username);
        headers = headers.append('Password', data.password);

        return this.apiService.getRequest(
            '/users/login',
            null,
            headers
        );
    }

    singUp(user: UserModel): Observable<any> {
        return this.apiService.postRequest(
            '/users/signup',
            user);
    }

    changeUser(body) {
        const id = this.currentUser.getValue().id;
        return this.apiService.putRequest(`/users/${id}`, body);
    }

    getUser(id: string): Observable<UserModel> {
        return this.apiService.getRequest(`/users/${id}`);
    }

    getUserBeforeInit(): Observable<AuthModel> | null {
        if (localStorage.getItem('token')) {
            return this.getCurrentUser();
        } else {
            return of(null);
        }
    }

    setUser(reqUser) {
        this.currentUser.next(this.getData(reqUser));
    }

    getData(reqUser): UserModel {
        const {_id, username, firstName = null, lastName = null, picture = null} = reqUser;
        return {
            firstName,
            id: _id,
            lastName,
            picture,
            username,
        };
    }

    getCurUser(): Observable<UserModel> {
        return this.currentUser.asObservable();
    }

    getUsers(): Observable<Array<UserModel>> {
        return this.apiService.getRequest(`/users`);
    }

    getCurrentUser(): Observable<AuthModel> {
        return this.apiService.getRequest(`/users/current`);
    }
}

