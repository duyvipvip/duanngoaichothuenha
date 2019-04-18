import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/@http-service/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-kiemduyetbaidang',
    templateUrl: './kiemduyetbaidang.component.html',
    styleUrls: ['./kiemduyetbaidang.component.css']
})
export class KiemduyetbaidangComponent implements OnInit {
    public rooms = [];
    constructor(private roomsv: RoomService, private toastr: ToastrService) { }

    ngOnInit() {
        this.GetRooms();
    }

    public GetRooms() {
        this.roomsv.getRooms()
            .then((data: any) => {
                this.rooms = data.Data;
            })
            .catch(err => {
                return err;
            });
    }

    thaydoitrangthai(room){
        this.roomsv.updateRoom({trangthai:  !room.trangthai, _id: room._id})
            .then((data) => {
                this.GetRooms();
                this.toastr.success("success", "Chỉnh sửa trang thái thành công")
            })
    }

}
