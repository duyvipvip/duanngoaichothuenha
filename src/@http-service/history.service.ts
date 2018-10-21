import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HistoryService {

    constructor(private http: HttpClient) { }
      public GetHistoryUser() {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.HISTORY.GET_HISTORY}`,{ headers: headers }).toPromise()
      }
      public GetHistoryByAdmin() {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.HISTORY.GET_HISTORY_ADMIN}`,{ headers: headers }).toPromise()
      }
}