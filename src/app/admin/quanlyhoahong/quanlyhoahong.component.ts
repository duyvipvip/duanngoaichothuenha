import { Component, OnInit } from '@angular/core';
import { RentHouseService } from 'src/@http-service/rentHouse.service';
import { ThanhToanService } from 'src/@http-service/thanhtoan.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/@http-service/room.service';

@Component({
    selector: 'app-quanlyhoahong',
    templateUrl: './quanlyhoahong.component.html',
    styleUrls: ['./quanlyhoahong.component.css']
})
export class QuanlyhoahongComponent implements OnInit {

    public rooms: any;
    public checksupperadmin: string = JSON.parse(localStorage.getItem('data')).user.role;
    constructor(private roomsv: RoomService, private toastr: ToastrService, private rentHouseService: RentHouseService, private ThanhToanService: ThanhToanService) {
        this.getQuanLyHoaHong();
    }

    ngOnInit() {
    }

    getQuanLyHoaHong() {

        if (this.checksupperadmin == 'admin' || this.checksupperadmin == 'user') {
            this.ThanhToanService.getAllThanhtoan()
                .then((thanhtoan: any) => {

                    this.roomsv.getRoomByUser()
                        .then((room: any) => {
                            let data = [];
                            for(let i =0; i< room.length; i++){
                                for(let j =0; j< thanhtoan.length; j++){
                                    if(room[i]._id == thanhtoan[j].idhouse._id){
                                        data.push(thanhtoan[j])
                                    }
                                }
                                
                            }
                            console.log(thanhtoan);
                            for (let i = 0; i < data.length; i++) {
                                data[i].sotienhoahongphaitra = data[i].idhouse.price * 0.2;
                                if (data[i].sotienhoahongphaitra < 1) {
                                    data[i].sotienhoahongphaitra = (data[i].sotienhoahongphaitra * 1000) + " Ngàn";
                                } else {
                                    data[i].sotienhoahongphaitra = data[i].sotienhoahongphaitra + " Triệu";
                                }
                            }
                            this.rooms = data;
                        })

                })
                .catch((err) => {

                })
        } else if (this.checksupperadmin == 'supperadmin') {
            this.ThanhToanService.getAllThanhtoan()
                .then((data: any) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        data[i].sotienhoahongphaitra = data[i].idhouse.price * 0.2;
                        if (data[i].sotienhoahongphaitra < 1) {
                            data[i].sotienhoahongphaitra = (data[i].sotienhoahongphaitra * 1000) + " Ngàn";
                        } else {
                            data[i].sotienhoahongphaitra = data[i].sotienhoahongphaitra + " Triệu";
                        }
                    }
                    this.rooms = data;
                })
                .catch((err) => {

                })
        }

    }

    thaydoitrangthanh(status, idhouse, iduser) {
        let body = {
            status: status,
            idhouse: idhouse,
            iduser: iduser
        }
        this.ThanhToanService.editthanhtoan(body)
            .then((data) => {
                this.getQuanLyHoaHong();
                this.toastr.success("success", "Chỉnh sửa thanh toán thành công")
            })
    }


}
