import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoomService } from 'src/@http-service/room.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';
@Component({
    selector: 'app-yeucauthuenha',
    templateUrl: './yeucauthuenha.component.html',
    styleUrls: ['./yeucauthuenha.component.scss']
})
export class YeucauthuenhaComponent implements OnInit {
    modalRef: BsModalRef;
    rooms = [];
    private selectRoom: any;
    public songuoiguiyeucauthue = 0;
    public listuserthuenha = [];
    public idhouse = "";
    public listStatus = [
        {
            value: 0,
            name: "Đang Đợi Xác Nhận"
        },
        {
            value: 1,
            name: "Xác Nhận"
        },
        {
            value: 2,
            name: "Từ Chối"
        }
    ];
    public chapnhanthuenha = {
        status: false,
        iduser: 0
    };
    public listYeuCauThueNha: any;
    constructor(private roomsv: RoomService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private taoYeuCauThueNhaService: TaoYeuCauThueNhaService
        ) { }

    ngOnInit() {
        this.layYeuCauThueNha();
    }
    get() {
        this.roomsv.getRoomByUser()
            .then((data: any) => {
                for (let i = 0; i < data.length; i++) {
                    let soluongguiyeucau = 0;
                    let trangthai = false;
                    for (let j = 0; j < this.listYeuCauThueNha.length; j++) {
                        if(data[i]._id == this.listYeuCauThueNha[j].idngoinha._id){
                            soluongguiyeucau++;
                            if(this.listYeuCauThueNha[j].trangthai == 1){
                                trangthai = true;
                            }
                        }
                       
                    }
                    data[i].dabannha = trangthai;
                    data[i].soluongguiyeucau = soluongguiyeucau;
                }
                this.rooms = [...data];
            })
            .catch(err => {
                return err;
            });
    }
    laytrangthaicuangoinha(roomOne) {
        // let tempCheck = false;
        // console.log(roomOne);
        // let userRentHouse = roomOne.iduserRentHouse;
        // for (let j = 0; j < userRentHouse.length; j++) {
        //     if (userRentHouse[j].status == "1") {
        //         tempCheck = true;
        //     }
        // }
        return roomOne.dabannha;
    }

    onChange(trangthai, idyeucau) {
        let model = {
            idhouse:  this.idhouse,
            trangthai: Number(trangthai),
            idyeucau: idyeucau,
        }
        this.taoYeuCauThueNhaService.thaydoitrangthai(model)
            .then((data) => {
                this.get();
                this.toastr.success("success", "Thay đổi trạng thái thành công")
            })
            .catch((err) => {

            })
    }

    layuserthuenha(room, idhouse, template: TemplateRef<any>) {
        if(this.laytrangthaicuangoinha(room) == true){
            this.toastr.error("Ngôi Nhà Này Đã Được Bán")
        }else{
            // let userRentHouse = room.iduserRentHouse;
            if (room.soluongguiyeucau > 0) {
                this.idhouse = idhouse;
                this.listuserthuenha = [];
                for(let i =0; i< this.listYeuCauThueNha.length; i++){
                    if(room._id == this.listYeuCauThueNha[i].idngoinha._id){
                        this.listuserthuenha.push(this.listYeuCauThueNha[i]);
                    }
                    if(Number(this.listYeuCauThueNha[i].trangthai) == 1){
                        this.chapnhanthuenha['status'] = true;
                    }else{
                        this.chapnhanthuenha['status'] = false;
                    }
                }
                this.modalRef = this.modalService.show(template);
            } else {
                this.toastr.error("Ngôi Nhà Này Chưa Có Ai Gửi Yêu Cầu Thuê Nhà")
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

    closeModal(template: TemplateRef<any>) {
        this.modalService.hide(0);
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
