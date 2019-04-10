import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendRentHouse } from 'src/@shared/interface';

@Injectable()
export class TaoYeuCauThueNhaService {
    // public iduserlogin: string = JSON.parse(localStorage.getItem('data')).user._id;
    constructor(private http: HttpClient) {

    }
    public taoYeuCauThueNha(model: ISendRentHouse) {
        model.idnguoigui = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.TAOYEUCAUTHUENHA}`, model).toPromise()
    }

    public CheckNgoiNhaDaThue(idngoinha: string ){
        let idnguoigui: string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.CHECK_NGOI_NHA_DA_THUE(idngoinha, idnguoigui)}`).toPromise()
    }

    public xoaYeuCauThueNha(idngoinha: string){
        let idnguoigui: string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.delete(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.DELETE_NHA_DA_THUE(idngoinha, idnguoigui)}`).toPromise()
    }

}
