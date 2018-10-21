
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/@http-service/contact.service';

@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.scss']
})
export class LienheComponent implements OnInit {
  public contact: any = [];
  public stt: any = [];
  constructor(private contactservice: ContactService) { }

  ngOnInit() {

    this.contactservice.GetContact()
      .then((data:any) => {
        for (let i = 0; i < data.length; i++) {
          data[i].stt =i + 1;
        }
        this.contact = data;
        console.log(data, 'test');
      })
  }

  deleteUser(){
    
  }

}
