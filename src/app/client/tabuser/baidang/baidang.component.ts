import { RoomService } from './../../../../@http-service/room.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-baidang',
  templateUrl: './baidang.component.html',
  styleUrls: ['./baidang.component.scss']
})
export class BaidangComponent implements OnInit {
  rooms = [];
  private selectRoom: any;
  constructor(private roomsv: RoomService,private toastr :ToastrService) { }

  ngOnInit() {
    this.roomsv.getRooms()
    .then((data: any) => {
        for(let i = 0;i<data.Data.length;i++){
          data.Data[i].stt = i+1;
        }
        this.rooms = data.Data;
    })
    .catch(err => {
        return err;
    }); 
  }

  getRoom(room) {
    this.selectRoom = room;
  }
  deleteRoom(){
    console.log(this.selectRoom,'dsd');
    this.roomsv.deleteRoom(this.selectRoom._id)
      .then((res)=>{
        this.toastr.success("success")
      })
      .catch((err)=>{
        this.toastr.error("error")
      })
  }

}
