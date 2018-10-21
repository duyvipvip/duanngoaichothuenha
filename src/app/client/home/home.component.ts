import { UserService } from './../../../@http-service/user.service';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public zoom: number;
    value: any;
    search: string = "";
    public latitude: number;
    public longitude: number;
    foods = [
        { value: '0.5', viewValue: '500 nghàn' },
        { value: '1', viewValue: '1 triệu' },
        { value: '1.5', viewValue: '1.5 triệu' },
        { value: '2', viewValue: '2 triệu' },
        { value: '2.5', viewValue: '2.5 triệu' },
        { value: '3', viewValue: '3 triệu' },
        { value: '4', viewValue: '4 triệu' },
    ];
    isCheckLogin: Boolean = false;
    rooms = [];
    constructor(private router: Router,
         private roomsv: RoomService,
         private userservice: UserService) { }

    ngOnInit() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    if(localStorage.getItem('data')) {
                        const location = {
                            lat: this.latitude,
                            lng: this.longitude
                        };
                        localStorage.setItem('location',this.latitude +' '+this.longitude)
                        this.userservice.updateUser({location:location})
                    }
                },
                error => {
                    switch (error.code) {
                        case 1:
                            console.log('Permission Denied');
                            break;
                        case 2:
                            console.log('Position Unavailable');
                            break;
                        case 3:
                            console.log('Timeout');
                            break;
                    }
                }
            );
        };
       
        this.roomsv.getRooms()
            .then((data: any) => {
                this.rooms = data.Data;
            })
            .catch(err => {
                return err;
            }); 
    }
    login() {
        this.router.navigate(['auth/login']);
    }
    register() {
        this.router.navigate(['auth/register']);
    }
    detailRoom() {
        this.router.navigate(['detailroom']);
    }
    Search() {
        if (this.search) {
            this.roomsv.Search(this.search)
                .then((data: any) => {
                    this.rooms = data.Data;
                })
                .catch(err => {
                    return err;
                });
        }
    }
    
    select(){
        this.roomsv.Search(this.value)
        .then((data: any) => {
            this.rooms = data.Data;
        })
        .catch(err => {
            return err;
        });
        
    }
  
}
