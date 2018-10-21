import { HistoryService } from './../../../@http-service/history.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private historyservice: HistoryService) { }
  public history:any = [];
  public stt:any =[];
  ngOnInit() {
      this.historyservice.GetHistoryByAdmin()
        .then((data:any)=>{ 
          for(let i = 0;i <data.length;i++){
            data[i].stt = (i+1);
          }
          this.history = data; 
          console.log(this.history,'sasa');
          
        })
  }
}
