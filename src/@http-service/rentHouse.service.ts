import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RentHouseService {
    constructor(private http: HttpClient) {

    }
    public GetOneRentHouse() {
        const token: string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.RENTHOUSE.GETID_RENTHOUSE}`, { headers: headers }).toPromise()
    }

    //
    public CreateRentHouse(body: any) {
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.RENTHOUSE.CREATE_RENTHOUSE}`, body).toPromise()
    }

    public deleteRentHouse(idhouse, iduser) {
        let body = {
            idhouse: idhouse,
            iduser: iduser
        }
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.RENTHOUSE.DELETERENTHOUSE}`, body).toPromise()
    }

    public quanlyhoahong() {
        const token: string = JSON.parse(localStorage.getItem('data')).token;
        let iduser = JSON.parse(localStorage.getItem('data')).user._id;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.RENTHOUSE.QUANLYHOAHONG(iduser)}`, { headers: headers }).toPromise()
    }
}
