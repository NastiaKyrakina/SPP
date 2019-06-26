import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpHeaders} from '@angular/common/http';
import {PrivateDataModel, UserModel} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../auth/auth.service";

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
        const id = this.currentUser.getValue()._id;
        return this.apiService.putRequest(`/users/${id}`, body);
    }

    getUser(id: string): Observable<UserModel> {
        return this.apiService.getRequest(`/users/${id}`);
    }

    getUserBeforeInit(): Promise<any> {
        return new Promise(resolve => {
            if (localStorage.getItem('token')) {
                this.getCurrentUser().subscribe((req) => {
                    this.setUser(req);
                });
            } else {
               this.currentUser.next(null);
            }
            resolve(true);
        });
    }

    setUser(reqUser) {
        this.currentUser.next(this.getData(reqUser));
    }

    getData(reqUser): UserModel {
        const {_id, username, firstName = null, lastName = null, picture = null} = reqUser;
        return {
            firstName,
            _id,
            lastName,
            picture,
            username,
        };
    }

    getCurUser(): Observable<UserModel> {
        return this.currentUser.asObservable();
    }

    private getCurrentUser(): Observable<UserModel> {
        return this.apiService.getRequest(`/users/current`);
    }
}

