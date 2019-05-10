import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/@http-service/room.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';
@Component({
    selector: 'app-baidang',
    templateUrl: './baidang.component.html',
    styleUrls: ['./baidang.component.scss']
})
export class BaidangComponent implements OnInit {
    public rooms: any;
    private selectRoom: any;
    public checksupperadmin: any;
    public listYeuCauThueNha: any;
    constructor(private roomsv: RoomService, private toastr: ToastrService, private taoYeuCauThueNhaService: TaoYeuCauThueNhaService) {
        this.checksupperadmin = JSON.parse(localStorage.getItem('data')).user.role;
    }

    ngOnInit() {
        this.layYeuCauThueNha();
    }
    get() {
        if (this.checksupperadmin == 'admin' || this.checksupperadmin == 'user') {
            this.roomsv.laycacbaidangcuauser()
                .then((data: any) => {
                    this.rooms = data;
                    this.laycactrangthai_Baidang();
                })
                .catch(err => {
                    return err;
                });
        } else if (this.checksupperadmin == "supperadmin") {
            this.roomsv.getRooms()
                .then((data: any) => {
                    this.rooms = data.Data;
                    this.laycactrangthai_Baidang();
                })
                .catch(err => {
                    return err;
                });
        }
    }

    laycactrangthai_Baidang(){
        // for (let i = 0; i < this.rooms.length; i++) {
        //     let trangthai_baidang = 1;
        //     let yeucauthuenha = 0;
        //     for (let j = 0; j < this.listYeuCauThueNha.length; j++) {
        //         if(this.rooms[i]._id == this.listYeuCauThueNha[j].idngoinha._id){
        //             if(this.listYeuCauThueNha[j].trangthai == 1){
        //                 trangthai_baidang = 2;
        //             }
        //             yeucauthuenha++;
        //         }
        //     }
           
        //     this.rooms[i].trangthai_baidang = trangthai_baidang;
        //     this.rooms[i].yeucauthuenha = yeucauthuenha;
        //     if(this.rooms[i].trangthai == false){
        //         this.rooms[i].trangthai_baidang = 0;
        //     }
        //     // chờ người thue
        //     if(this.rooms[i].trangthai_baidang != 2 && yeucauthuenha == 0){
        //         this.rooms[i].trangthai_baidang = 3;
        //     }

        // }
        for (let i = 0; i < this.rooms.length; i++) {
            let soluongguiyeucau = 0;
            for (let j = 0; j < this.listYeuCauThueNha.length; j++) {
                if(this.rooms[i]._id == this.listYeuCauThueNha[j].idngoinha._id){
                    soluongguiyeucau++;

                    // if(this.listYeuCauThueNha[j].trangthai == 1){
                    //     soluongguiyeucau = -1;
                    //     break;
                    // }
                }
               
            }
            if(this.rooms[i].trangthaidathue == true){
                this.rooms[i].trangthai_baidang = 2;
            }
            if(soluongguiyeucau == 0){
                this.rooms[i].trangthai_baidang = 3;
            }
            if(soluongguiyeucau > 0 && this.rooms[i].trangthaidathue == false){
                this.rooms[i].trangthai_baidang = 1;
            }
            if(this.rooms[i].trangthai == false){
                this.rooms[i].trangthai_baidang = 0;
            }
        }
    }
    getRoom(room) {
        this.selectRoom = room;
    }
    deleteRoom() {
        this.roomsv.deleteRoom(this.selectRoom._id)
            .then((res) => {
                this.toastr.success("success")
                this.get();
            })
            .catch((err) => {
                this.toastr.error("error")
            })
    }

    layYeuCauThueNha(){
        this.taoYeuCauThueNhaService.layCacYeuCauThueNhaCuaUser()
            .then((res) => {
                this.listYeuCauThueNha = res;
                this.get();
            })
            .catch((err) => {
            })
    }

}
