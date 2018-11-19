import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/@http-service/room.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-baidang',
    templateUrl: './baidang.component.html',
    styleUrls: ['./baidang.component.scss']
})
export class BaidangComponent implements OnInit {
    public rooms: any;
    private selectRoom: any;
    public checksupperadmin: any;
    constructor(private roomsv: RoomService, private toastr: ToastrService) {
        this.checksupperadmin = JSON.parse(localStorage.getItem('data')).user.role;
    }

    ngOnInit() {
        this.get();
    }
    get() {
        if (this.checksupperadmin == 'admin' || this.checksupperadmin == 'user') {
            this.roomsv.laycacbaidangcuauser()
                .then((data: any) => {
                    this.rooms = data;
                })
                .catch(err => {
                    return err;
                });
        } else if (this.checksupperadmin == "supperadmin") {
            this.roomsv.getRooms()
                .then((data: any) => {
                    console.log(data);
                    this.rooms = data.Data;
                })
                .catch(err => {
                    return err;
                });
        }
    }
    getRoom(room) {
        this.selectRoom = room;
    }
    deleteRoom() {
        console.log(this.selectRoom, 'dsd');
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
