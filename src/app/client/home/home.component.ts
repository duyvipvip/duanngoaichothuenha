import { UserService } from './../../../@http-service/user.service';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { RatingService } from 'src/@http-service/rating.service';
import { ToastrService } from 'ngx-toastr';


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
    rate = 7;
    max = 10;
    isReadonly = false;
    ratingStates = [
        { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
        { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
        { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
        { stateOn: 'glyphicon-heart' },
        { stateOff: 'glyphicon-off' }
    ];
    constructor(private router: Router,
        private roomsv: RoomService,
        private RatingService: RatingService,
        private toastr: ToastrService,
        private userservice: UserService) { }

    ngOnInit() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    if (localStorage.getItem('data')) {
                        const location = {
                            lat: this.latitude,
                            lng: this.longitude
                        };
                        localStorage.setItem('location', this.latitude + ' ' + this.longitude)
                        this.userservice.updateUser({ location: location })
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
        this.GetRooms();
    }

    public GetRooms(){
        this.roomsv.getRooms()
        .then((data: any) => {
            this.rooms = data.Data;
            this.tinhrate();
        })
        .catch(err => {
            return err;
        });
    }
    public ratingComponentClick(clickObj: any): void {
        this.RatingService.UpdateRateRoom(clickObj).then((data) => {
            this.GetRooms();
            this.toastr.success("Đánh giá thành công");
        })
        .catch((err) => {
            this.toastr.success("Đánh giá thất bại");
        })

    }

    public tinhrate(){
        for(let i= 0; i< this.rooms.length; i++){
            this.rooms[i].totalRate = 0;
            let rate = this.rooms[i].rate;
            if(rate.length> 0){
                for(let j =0; j< rate.length; j++){
                    this.rooms[i].totalRate += rate[j].star;
                }
                this.rooms[i].totalRate /= rate.length;
                this.rooms[i].totalRate = Math.round(this.rooms[i].totalRate);
            }
        }
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

    select() {
        this.roomsv.Search(this.value)
            .then((data: any) => {
                this.rooms = data.Data;
            })
            .catch(err => {
                return err;
            });

    }

}
