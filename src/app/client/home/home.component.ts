import { UserService } from './../../../@http-service/user.service';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { RatingService } from 'src/@http-service/rating.service';
import { ToastrService } from 'ngx-toastr';
declare const google: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public zoom: number;
    value: any;
    public tinh: any = '';
    public txtsearch: string = "";
    public latitude: number;
    public strLoaiNha: string = "";
    public longitude: number;
    public checkShowLocation: boolean = false;
    public arrayTinh = [
        'Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ', 'Phú Yên', 'Yên Bái', 'Vĩnh Phúc', 'Vĩnh Long', 'Tuyên Quang', 'Trà Vinh', 'Tiền Giang', 'Thừa Thiên Huế', 'Thanh Hóa', 'Thái Nguyên', 'Thái Bình', 'Tây Ninh', 'Sơn La', 'Sóc Trăng', 'Quảng Trị', 'Quảng Ninh', 'Quảng Ngãi', 'Quảng Nam', 'Quảng Bình', 'Phú Thọ', 'Ninh Thuận', 'Ninh Bình', 'Nghệ An', 'Nam Định', 'Long An', 'Lào Cai', 'Lạng Sơn', 'Lâm Đồng', 'Lai Châu', 'Kon Tum', 'Kiên Giang', 'Khánh Hòa', 'Hưng Yên', 'Hòa Bình', 'Hậu Giang', 'Hải Dương', 'Hà Tĩnh', 'Hà Nam', 'Hà Giang', 'Gia Lai', 'Đồng Tháp', 'Đồng Nai', 'Điện Biên', 'Đắk Nông', 'Đắk Lắk', 'Cao Bằng', 'Cà Mau', 'Bình Thuận', 'Bình Phước', 'Bình Dương', 'Bình Định', 'Bến Tre', 'Bắc Ninh', 'Bạc Liêu', 'Bắc Kạn', 'Bắc Giang', 'Bà Rịa - Vũng Tàu', 'An Giang',
    ];
    public LoaiNha: any[] = ["Nhà Nguyên Căn", "Nhà Trọ", "Nhà Chung Cư"]
    public sodem = 0;
    public khoanggia: string;
    foods = [
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
    @ViewChild("searchLocation")
    public searchElementRef: ElementRef;
    @ViewChild('toggleButton') toggleButton: ElementRef;
    constructor(private router: Router,
        private roomsv: RoomService,
        private renderer: Renderer2,
        private RatingService: RatingService,
        private toastr: ToastrService,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader,
        private userservice: UserService) {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    //add dia chia
                    this.searchTinh(place.formatted_address);
                });
            });
        });
        // this.changeInput()
    }

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
        // this.roomsv.laymangtoadolocation()
        // .then((data: any) => {
        //     debugger;
        //     this.arrCountry = [];
        //     let geocoder = new google.maps.Geocoder;
        //     data.forEach(item => {
        //         let latlng = {lat: item.lat, lng: item.lng};
        //         geocoder.geocode({'location': latlng}, (results, status) => {
        //             this.arrCountry.push(results[0].address_components[2].short_name);
        //             console.log(this.arrCountry);
        //         });
        //     });

        // })
        this.GetRooms();
    }

    public changeInput() {
        if ((this.txtsearch == '' || this.txtsearch == null) && this.sodem > 0) {
            this.checkShowLocation = true;
        } else {
            this.checkShowLocation = false;
        }
        this.sodem++;
    }

    public blurchangeInput(event) {
        debugger;
        this.checkShowLocation = false;
    }

    public layvitrihientai() {
        debugger;
    }

    public searchTinh(str: string) {
        this.tinh = '';
        for (let i = 0; i < this.arrayTinh.length; i++) {
            if (str.search(this.arrayTinh[i]) != -1) {
                this.tinh = this.arrayTinh[i];
                break;
            }
        }
    }
    public GetRooms() {
        this.rooms = [];
        this.roomsv.getRooms()
            .then((data: any) => {
                for(let i=0; i< data.Data.length; i++){
                    if(data.Data[i].trangthai == true && data.Data[i].trangthaidathue == false){
                        this.rooms.push(data.Data[i])
                    }
                }
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

    public tinhrate() {
        for (let i = 0; i < this.rooms.length; i++) {
            this.rooms[i].totalRate = 0;
            let rate = this.rooms[i].rate;
            if (rate.length > 0) {
                for (let j = 0; j < rate.length; j++) {
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
        this.khoanggia = (this.khoanggia == undefined) ? '' : this.khoanggia;
        this.tinh = (this.tinh == undefined) ? '' : this.tinh;
        this.strLoaiNha = (this.strLoaiNha == undefined) ? '' : this.strLoaiNha;
        this.roomsv.Search(this.strLoaiNha, this.tinh, this.khoanggia)
            .then((data: any) => {
                this.rooms = data.Data;
            })
            .catch(err => {
                return err;
            });
    }
}
