import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ThanhToanService {
    constructor(private http: HttpClient) {

    }
    public getAllThanhtoan() {
        const token: string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.THANHTOAN.GETALL}`, { headers: headers }).toPromise()
    }

    public editthanhtoan(body){
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.THANHTOAN.EDITTHANHTOAN}`,body).toPromise()
    }

    public getallthanhtoanbyuser(){
        const iduser: string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.THANHTOAN.GETALLBYUSER(iduser)}`).toPromise()
    }

    
}
