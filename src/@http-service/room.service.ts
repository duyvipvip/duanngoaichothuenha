import { Injectable } from '@angular/core';
import { APICONFIG } from './config/api-config';
import { HttpClient, HttpHeaders      } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RoomService {

    constructor(private http: HttpClient) { }
    public createRoom(formData, file: File[]) {
        const requestForm = new FormData();
        requestForm.append('data', JSON.stringify(formData));
        for (var i = 0; i < file.length; i++) { 
            let tempFile: any = file[i];
            for(let j = 0; j< tempFile.length; j++){
                requestForm.append("files", tempFile[j]);
            }
          }
          debugger;
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.CREATE_ROOM}`, requestForm, { headers: headers }).toPromise();
    }
    public getRooms() {
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.GET_ROOMS}`).toPromise()
           
    }

    public laylichsuyeucauthuenha(iduser){
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.LAYLICHSUYEUCAUTHUENHA(iduser)}`).toPromise()
        
    }

    public laycacbaidangcuauser(){
        const iduser :string = JSON.parse(localStorage.getItem('data')).user._id;
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.LAYCACBAIDANGCUAUSER(iduser)}`).toPromise()
    }
    public Search(search?:string) {
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.GET_ROOMS}`+'?search='+search).toPromise()
           
    }
    public getRoomByUser() {
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.GET_ROOM_BY_USER}`,{ headers: headers }).toPromise()
            .then(data => {
                return data;
            })
            .catch(err => {
                return err;
            });
    }
    public updateRoom(body: any) {
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.UPDATE_ROOM}`, body).toPromise()
            .then(data => {
                return data;
            })
            .catch(err => {
                return err;
            });
    }
    public deleteRoom(id: String) {
        return this.http.delete(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.DELETE_ROOM}` + id).toPromise()
            .then(data => {
                return data;
            })
            .catch(err => {
                return err;
            });
    }
    getCity() {
        return this.http.get('assets/data/data.json').toPromise()
      }
      public getRoomById(id: String) {
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.GET_ROOM_BY_ID}/` +id).toPromise()
            .then(data => {
                return data;
            })
            .catch(err => {
                return err;
            });
    }
    public TRANSACTION(id: String){
        return this.http.put(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.TRANSACTION}` +id,{}).toPromise()
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
    }

    //
    public changestatususer(idhouse, status, iduser){
        const idusercreate :string = JSON.parse(localStorage.getItem('data')).user._id;
        let requestForm = {
            idhouse: idhouse,
            status: status,
            iduser: iduser,
            idusercreate: idusercreate
        }
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.post(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.CHANGESTATUSUSER}`, requestForm, { headers: headers }).toPromise();
    }

    public laymangtoadolocation(){
        const token :string = JSON.parse(localStorage.getItem('data')).token;
        let headers = new HttpHeaders().set('x-access-token', token);
        return this.http.get(`${APICONFIG.BASEPOINT}${APICONFIG.ROOM.LAYMANGTOADOLOCATION}`, { headers: headers }).toPromise();
    }
}