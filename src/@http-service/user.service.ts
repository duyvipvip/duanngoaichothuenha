import { IUser } from './../@shared/interface/IUser';
import { Injectable } from '@angular/core';
import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    
    private alluser: BehaviorSubject<any> = new BehaviorSubject(new Array());
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


