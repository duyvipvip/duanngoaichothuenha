import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuleft',
  templateUrl: './menuleft.component.html',
  styleUrls: ['./menuleft.component.scss']
})
export class MenuleftComponent implements OnInit {

  public checksupperadmin: string = "";
  constructor() {
    this.checksupperadmin = JSON.parse(localStorage.getItem('data')).user.role;
  }

  ngOnInit() {
  }

}
