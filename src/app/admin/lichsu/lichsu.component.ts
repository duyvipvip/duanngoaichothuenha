import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/@http-service/history.service';

@Component({
  selector: 'app-lichsu',
  templateUrl: './lichsu.component.html',
  styleUrls: ['./lichsu.component.scss']
})
export class LichsuComponent implements OnInit {

  constructor(private historyservice: HistoryService) { }
  private history:any = [];
  private stt:any =[];
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
