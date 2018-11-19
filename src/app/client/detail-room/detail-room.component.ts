import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../@http-service/user.service';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';
import { RentHouseService } from 'src/@http-service/rentHouse.service';

@Component({
    selector: 'app-detail-room',
    templateUrl: './detail-room.component.html',
    styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent implements OnInit {
    public getRoom: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public latitudeUser: number;
    public longitudeUser: number;
    public location: any;
    public lengh: any;
    public classguiyeucauthuenha: string = "btn btn-success";
    public nameguiyeucauthuenha: string = "Gửi Yêu Cầu Thuê Nhà";
    public iduserlogin: string = JSON.parse(localStorage.getItem('data')).user._id;
    public idRoom: string = '';

    public objectTrangthai = {
        status: -1,
        iduser: 0,
        disablebutton: false,
    }
    constructor(private router: Router,
        private room: RoomService,
        private rentHouseService: RentHouseService,
        private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {

    }

    ngOnInit() {
        this.location = localStorage.getItem('location').split(" ");
        this.latitudeUser = +this.location[0];
        this.longitudeUser = +this.location[1];
        this.route.params.subscribe(params => {
            this.idRoom  = params['id'] as string;
            this.getData();
        })


    }

    public getData(){
        this.objectTrangthai = {
            status: -1,
            iduser: 0,
            disablebutton: false,
        }
        this.classguiyeucauthuenha = "btn btn-success";
        this.nameguiyeucauthuenha = "Gửi Yêu Cầu Thuê Nhà";
        this.room.getRoomById(this.idRoom )
        .then((data) => {
            this.getRoom = data;
            this.latitude = data.location.lat;
            this.longitude = data.location.lng;
            this.lengh = this.distanceBetween2Points(this.latitude, this.longitude, this.latitudeUser, this.longitudeUser)
            this.zoom = 12;

            // set xem da gui yeu cau thue nha trua
            if(data.iduserRentHouse.length != 0){
                for(let i=0; i<data.iduserRentHouse.length; i++){
                    if(data.iduserRentHouse[i].iduser == this.iduserlogin){
                        this.objectTrangthai.status = data.iduserRentHouse[i].status;
                        break;
                    }
                }
                
            }

            if(this.objectTrangthai.status == 0){
                this.objectTrangthai.disablebutton = true;
                this.classguiyeucauthuenha="btn btn-warning";
                this.nameguiyeucauthuenha = "Xin Vui Lòng Đợi Xác Nhận Từ Chủ Nhà"
            }
            // if(this.objectTrangthai.status  != 1){
            //     this.objectTrangthai.disablebutton = t;
            // }

           
        })
    }
    public distanceBetween2Points(la1, lo1,
        la2, lo2) {
        var R = 6371000;
        let dLat = (la2 - la1) * (Math.PI / 180);
        let dLon = (lo2 - lo1) * (Math.PI / 180);
        let la1ToRad = la1 * (Math.PI / 180);
        let la2ToRad = la2 * (Math.PI / 180);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad)
            * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
    }

    Transection() {
        this.room.TRANSACTION(this.getRoom._id)
            .then(() => {
                this.toastr.success('Transection Success', '');
                this.router.navigate(['/client']);
            })
    }

    directAddress() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                window.open(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${this.latitude},${this.longitude}`, "_blank");
            });
        }
    }

    // 
    public guiyeucauthuenha() {
        let body = {
            iduserRent: this.getRoom.id_user._id,
            idhouse: this.getRoom._id,
            iduserRented: JSON.parse(localStorage.getItem('data')).user._id,
            price: this.getRoom.price,
            unit: this.getRoom.unit,
        }
        this.rentHouseService.CreateRentHouse(body)
            .then((data) => {
                this.getData();
                this.toastr.success('success','Gửi yêu cầu thuê nhà thành công')
            })
            .catch((err) => {
                this.toastr.error('error', err.error.message);
            })
    }

    public xoayeucau(){
        this.rentHouseService.deleteRentHouse(this.idRoom, this.iduserlogin)
            .then((data) => {
                this.getData();
                this.toastr.success('success','Xoá Yêu Cầu Thuê Nhà Thành Công')
            })
            .catch((err) => {
                this.toastr.error('error', err.error.message);
            })
    }

}
