import { IUser } from './../@shared/interface/IUser';
import { Injectable } from '@angular/core';
import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    
    private alluser: BehaviorSubject<any> = new BehaviorSubject(new Array());
    public arrayTinh = [
       'Hồ Chí Minh','Hà Nội','Hải Phòng','Đà Nẵng','Cần Thơ','Phú Yên','Yên Bái','Vĩnh Phúc','Vĩnh Long','Tuyên Quang','Trà Vinh','Tiền Giang','Thừa Thiên Huế','Thanh Hóa','Thái Nguyên','Thái Bình','Tây Ninh','Sơn La','Sóc Trăng','Quảng Trị','Quảng Ninh','Quảng Ngãi','Quảng Nam','Quảng Bình','Phú Thọ','Ninh Thuận','Ninh Bình','Nghệ An','Nam Định','Long An','Lào Cai','Lạng Sơn','Lâm Đồng','Lai Châu','Kon Tum','Kiên Giang','Khánh Hòa','Hưng Yên','Hòa Bình','Hậu Giang','Hải Dương','Hà Tĩnh','Hà Nam','Hà Giang','Gia Lai','Đồng Tháp','Đồng Nai','Điện Biên','Đắk Nông','Đắk Lắk','Cao Bằng','Cà Mau','Bình Thuận','Bình Phước','Bình Dương','Bình Định','Bến Tre','Bắc Ninh','Bạc Liêu','Bắc Kạn','Bắc Giang','Bà Rịa - Vũng Tàu','An Giang',
    ]
    constructor(private http: HttpClient
        //  private toastr: ToastrService
    ) { }

    public createUser(body: any) {
       return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.USER.CREATE_USER}`, body).toPromise()
        .then(data => {    
        })
        .catch(err => {
        });
      }
    public getAllUser() {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.USER.GET_ALL_USER}`,{ headers: headers }).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
      }
    public updateUser(body: any) {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
      
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.USER.UPDATE_USER}`,body,{ headers: headers }).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
    }
    public getInforUser() {
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.USER.GET_INFOR_USER}`).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
    }
    public changePassword(body: any) {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.USER.CHANGE_PASSWORD}`,body,{ headers: headers }).toPromise();
       
    }
    public forgetPassword(body: any) {
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.USER.FORGET_PASSWORD}`,body).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
    }
    public UpdateByAdmin(body: any) {
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.USER.UPDATE_USER_BY_ADMIN}`,body).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
    }
    public DeleteUser(id: string) {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.delete(`${APICONFIG.BASEPOINT}${APICONFIG.USER.DELETE_USER}`+id,{ headers: headers }).toPromise()
        .then(data => {    
            return data;
        })
        .catch(err => {
            return err
        });
    }
    public UploadAvatar(body: any){
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.USER.UPLOAD_AVATAR}`,body,{ headers: headers }).toPromise()
       
    }
}


