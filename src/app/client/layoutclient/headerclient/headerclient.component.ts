import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
    selector: 'app-headerclient',
    templateUrl: './headerclient.component.html',
    styleUrls: ['./headerclient.component.scss']
})
export class HeaderclientComponent implements OnInit {

    constructor(private router: Router) { }
    user: any;
    ngOnInit() {
        if(JSON.parse(localStorage.getItem('data'))){
            this.user = JSON.parse(localStorage.getItem('data')).user;
        }
    }

    goInfoUser(){
        this.router.navigate(['client/infouser']);
    }

    //
    goInfoAdmin(){
        this.router.navigate(['admin']);
    }

    goMangermentPostnew(){
        this.router.navigate(['client/mangermentPostnew']);
    }
    logout(){
        localStorage.clear();
        this.router.navigate(['auth/login']);
    }

}
