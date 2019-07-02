import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    api: string;

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    static setParams(params: object): HttpParams | null {
        if (!params) {
            return null;
        }

        let httpParams: HttpParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                httpParams = httpParams.append(key, params[key]);
            }
        }
        return httpParams;
    }

    static setOptions(params?: object, headers?: HttpHeaders) {
        return {
            params: ApiService.setParams(params),
            headers: headers || null,
        };
    }

    getFullUrl(url: string) {
        return `${environment.api}${url}`;
    }

    postRequest(url: string, body, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
        return this.http.post(this.getFullUrl(url), body, ApiService.setOptions(params, headers));
    }

    getRequest(url: string, params?: object, headers?: HttpHeaders): Observable<any> {
        return this.http.get(this.getFullUrl(url), ApiService.setOptions(params, headers));
    }

    deleteRequest(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
        return this.http.delete(this.getFullUrl(url), ApiService.setOptions(params, headers));
    }

    putRequest(url: string, body, params?: HttpParams, headers?: HttpHeaders): Observable<any> {
        return this.http.put(this.getFullUrl(url), body, ApiService.setOptions(params, headers));
    }
}
