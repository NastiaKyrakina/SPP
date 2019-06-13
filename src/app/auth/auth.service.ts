import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authorized = true;
    redirectUrl: string;

    constructor() {
    }

    isAuthUser(): boolean {
        return this.authorized;
    }

    logout(): void {
        this.authorized = false;
    }
}
