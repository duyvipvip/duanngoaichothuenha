import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendRentHouse } from 'src/@shared/interface';

@Injectable()
export class TaoYeuCauThueNhaService {
    // public iduserlogin: string = JSON.parse(localStorage.getItem('data')).user._id;
    constructor(private http: HttpClient) {

    }
    public taoYeuCauThueNha(model: ISendRentHouse, file: File[]) {
        model.idnguoigui = JSON.parse(localStorage.getItem('data')).user._id;
        const requestForm = new FormData();
        requestForm.append('data', JSON.stringify(model));
        for (var i = 0; i < file.length; i++) { 
            let tempFile: any = file[i];
            for(let j = 0; j< tempFile.length; j++){
                requestForm.append("files", tempFile[j]);
            }
          }
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.TAOYEUCAUTHUENHA}`, requestForm, {headers: headers}).toPromise()
    }

    public CheckNgoiNhaDaThue(idngoinha: string ){
        let idnguoigui: string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.CHECK_NGOI_NHA_DA_THUE(idngoinha, idnguoigui)}`).toPromise()
    }

    public xoaYeuCauThueNha(idngoinha: string){
        let idnguoigui: string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.delete(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.DELETE_NHA_DA_THUE(idngoinha, idnguoigui)}`).toPromise()
    }

    public layCacYeuCauThueNhaCuaUser(){
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.LAY_YEU_CAU_THUE_NHA}`).toPromise()
    }

    public thaydoitrangthai(model){
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.TAOYEUCAUTHUENHA.THAY_DOI_TRANG_THAI}`, model).toPromise()
    }

}
