import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingService {

    constructor(private http: HttpClient) { }
    public UpdateRateRoom(model) {
        const token: string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.RATING.UPDATE(model.itemId)}`, model , { headers: headers }).toPromise()
    }
    
}