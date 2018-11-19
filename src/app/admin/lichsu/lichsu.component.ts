import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/@http-service/history.service';
import { RoomService } from 'src/@http-service/room.service';

@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.component.html',
  styleUrls: ['./lichsu.component.scss']
})
export class LichsuComponent implements OnInit {

  constructor(private historyservice: HistoryService, private roomsv: RoomService) { }
  public history:any = [];
  public stt:any =[];
  public iduser = JSON.parse(localStorage.getItem('data')).user._id;
  ngOnInit() {
      this.roomsv.laylichsuyeucauthuenha(this.iduser)
        .then((data:any)=>{ 
          for(let i = 0;i <data.length;i++){
            data[i].stt = (i+1);
          }
          console.log(data);
          this.history = data; 
          
        })
  }
}
