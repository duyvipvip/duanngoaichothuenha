import { Injectable } from '@angular/core';
import { APICONFIG } from './config/api-config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }
    public Login(body: any) {
        
        
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.AUTH.LOGIN}`, body).toPromise();
       }
}