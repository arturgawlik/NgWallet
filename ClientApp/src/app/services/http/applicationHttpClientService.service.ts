import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { map, flatMap, first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApplicationHttpClient {

    constructor(private authService: AuthService, private httpClient: HttpClient) {
    }

    get<T>(url: string): Observable<T> {
        return this.getHttpHeader().pipe(
            flatMap(header => {
                return this.httpClient.get<T>(url, { headers: header });
            }),
            first()
        );
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.getHttpHeader().pipe(
            flatMap(header => {
                return this.httpClient.post<T>(url, body, { headers: header });
            }),
            first()
        );
    }

    put<T>(url: string, body: any): Observable<T> {
        return this.getHttpHeader().pipe(
            flatMap(header => {
                return this.httpClient.put<T>(url, body, { headers: header });
            }),
            first()
        );
    }

    delete<T>(url: string): Observable<T> {
        return this.getHttpHeader().pipe(
            flatMap(header => {
                return this.httpClient.delete<T>(url, { headers: header });
            }),
            first()
        );
    }

    private getHttpHeader() {
        return this.authService.getToeknObs().pipe(
            map(token => {
                return new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                });
            })
        );
    }
} 