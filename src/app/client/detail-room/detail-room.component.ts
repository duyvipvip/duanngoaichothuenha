import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../@http-service/user.service';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '../../../../node_modules/@agm/core';

@Component({
    selector: 'app-detail-room',
    templateUrl: './detail-room.component.html',
    styleUrls: ['./detail-room.component.scss']
})
export class DetailRoomComponent implements OnInit {
    public getRoom: any;
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public latitudeUser: number;
    public longitudeUser: number;
    public location: any;
    public lengh: any;
    constructor(private router: Router,
        private room: RoomService,
        private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {

    }

    ngOnInit() {
        this.location = localStorage.getItem('location').split(" ");
        this.latitudeUser = +this.location[0];
        this.longitudeUser = +this.location[1];
        this.route.params.subscribe(params => {
            const id = params['id'] as string;
            this.room.getRoomById(id)
                .then((data) => {
                    this.getRoom = data;
                    this.latitude = data.location.lat;
                    this.longitude = data.location.lng;
                    this.lengh = this.distanceBetween2Points(this.latitude, this.longitude, this.latitudeUser, this.longitudeUser)
                    console.log(this.lengh);
                    this.zoom = 12;
                })
        })


    }
    public distanceBetween2Points(la1, lo1,
        la2, lo2) {
        var R = 6371000;
        let dLat = (la2 - la1) * (Math.PI / 180);
        let dLon = (lo2 - lo1) * (Math.PI / 180);
        let la1ToRad = la1 * (Math.PI / 180);
        let la2ToRad = la2 * (Math.PI / 180);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad)
            * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
    }

    Transection() {
        this.room.TRANSACTION(this.getRoom._id)
            .then(() => {
                this.toastr.success('Transection Success', '');
                this.router.navigate(['/client']);
            })
    }

    directAddress() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                window.open(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${this.latitude},${this.longitude}`, "_blank");
            });
        }
    }

}
