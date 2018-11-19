import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/@http-service/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-yeucauthuenha',
    templateUrl: './yeucauthuenha.component.html',
    styleUrls: ['./yeucauthuenha.component.css']
})
export class YeucauthuenhaComponent implements OnInit {

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
    constructor(private roomsv: RoomService, private toastr: ToastrService) { }

    ngOnInit() {
        this.get();
    }
    get() {
        this.chapnhanthuenha = {
            status: false,
            iduser: 0
        }
        this.roomsv.getRoomByUser()
            .then((data: any) => {
                console.log(data);
                for(let i=0; i< data.length; i++){
                    let soluongguiyeucau=0;
                    for(let j = 0; j< data[i].iduserRentHouse.length; j++){
                        if(data[i].iduserRentHouse[j].status == 0){
                            soluongguiyeucau++;
                        }
                        if(data[i].iduserRentHouse[j].status == 1){
                            this.chapnhanthuenha['status'] = true;
                            this.chapnhanthuenha['iduser'] = data[i].iduserRentHouse[j].iduser._id;
                        }
                    }
                    data[i].soluongguiyeucau = soluongguiyeucau;
                }

                this.rooms = [...data];
            })
            .catch(err => {
                return err;
            });
    }

    onChange(value, iduser){
        this.roomsv.changestatususer(this.idhouse, value, iduser)
            .then((data) => {
                this.get();
                this.toastr.success("success", "Thay đổi trạng thái thành công")
            })
            .catch((err) => {

            })
    }
    
    layuserthuenha(userRentHouse, idhouse){
        console.log(userRentHouse);
        this.idhouse = idhouse;
        this.listuserthuenha = userRentHouse;
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

}
