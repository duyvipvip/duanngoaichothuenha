import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/@http-service/room.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';

@Component({
    selector: 'app-xemchitietnha',
    templateUrl: './xemchitietnha.component.html',
    styleUrls: ['./xemchitietnha.component.scss']
})
export class XemchitietnhaComponent implements OnInit {
    public getRoom: any;
    public idRoom: string = '';
    public latitude: number;
    public longitude: number;
    public zoom: number;
    constructor(private router: Router,
        private room: RoomService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private modalService: BsModalService,
    ) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idRoom = params['id'] as string;
            this.getData();
        })
    }
    public getData() {
        this.room.getRoomById(this.idRoom)
            .then((data) => {
                this.getRoom = data;
                this.latitude = data.location.lat;
                this.longitude = data.location.lng;
                this.zoom = 12;
            })
    }
}
