import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authorized = true;
    redirectUrl: string;
    private token: string | null;
    private id: string | null;

    constructor(private userService: UserService) {
    }

    isAuthUser(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        this.authorized = false;
        this.token = null;
        this.id = null;
        this.userService.currentUser.next(null);
        localStorage.clear();
    }

    setToken(newToken: string): void {
        this.token = newToken;
        localStorage.setItem('token', this.token);
    }

    getToken(): string {
        this.token = localStorage.getItem('token');
        return this.token;
    }

    setId(newId: string) {
        this.id = newId;
        localStorage.setItem('usr_id', this.id);
    }

    getId(): string {
        this.id = localStorage.getItem('usr_id');
        return this.id;
    }
}
