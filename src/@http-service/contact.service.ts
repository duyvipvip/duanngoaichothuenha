import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {
    constructor(private http: HttpClient) {
        
     }
    public GetContact() {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
      return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.CONTACT.GET_CONTACT}`,{ headers: headers }).toPromise()
    }
    public CreateContact(body: any) {
      return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.CONTACT.CREATE_CONTACT}`,body).toPromise()
    }
}
