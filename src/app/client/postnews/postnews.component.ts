import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from './../../../@http-service/room.service';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { google } from '@google/maps';
declare var google;
@Component({
    selector: 'app-postnews',
    templateUrl: './postnews.component.html',
    styleUrls: ['./postnews.component.scss']
})
export class PostnewsComponent implements OnInit {
    tp = [];
    Quans = [];
    Ward = [];
    Street = [];
    tempAdddrest: string = "";
    formAddPostNew: FormGroup;
    formEditPostNew: FormGroup;
    addressCity: String = ""
    addressDitrict: String = "";
    addressWrad: String = "";
    addressStreet: String = "";
    file: Array<File> = [];
    public latitude: number;
    public longitude: number;
    public zoom: number;
    public srcFileUpload: Array<any> = [];
    public editorValue: string = "";
    public fileGiayTo: Array<File> = [];
    @ViewChild("search")
    public searchElementRef: ElementRef;
    public iduserlogin: any =  JSON.parse(localStorage.getItem('data'));
    public LoaiNha: any[] = ["Nhà Nguyên Căn", "Nhà Trọ", "Nhà Chung Cư"];
    public srcFileUploadGiayTo:  Array<any> = [];
    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private roomsv: RoomService,
        private mapsAPILoader: MapsAPILoader,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone) { }

    ngOnInit() {
        if (!JSON.parse(localStorage.getItem('data'))) {
            this.router.navigate(['auth']);
        } else {
            this.gethouse()
            this.formAddPostNew = this.fb.group({
                // Validators.required labat buoc phai co
                title: ['',],
                category: ['',],
                phone: [''],
                price: ['',],
                unit: [''],
                acreage: ['',],
                sex: [''],
                address: [''],
                description: [],
            });
            // this.formEditPostNew = this.fb.group({
            //     title: [''],
            //     category: [''],
            //     phone: [''],
            //     price: [''],
            //     unit: [''],
            //     acreage: [''],
            //     sex: [''],
            //     address: ['']
            // });
            //set google maps defaults
            this.zoom = 4;
            //create search FormControl
            // this.searchControl = new FormControl();

            //set current position
            this.setCurrentPosition();

            //load Places Autocomplete
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
                        this.tempAdddrest = place.formatted_address;
                        this.formAddPostNew.controls['address'].setValue(place.formatted_address)
                    });
                });
            });
        }
    }
    postRoom() {
        const location = {
            lat: this.latitude,
            lng: this.longitude
        };

        this.formAddPostNew.value.location = location;
        this.roomsv.createRoom(this.formAddPostNew.value, this.file, this.fileGiayTo)
            .then((data) => {
                this.toastr.success('success', 'Chúc Mừng Bạn Đã Đăng Tin Thành Công')
                this.router.navigate(['/client']);
            })
            .catch((err) => {
                this.toastr.error("Error", err.error.message);
            })
    }

    /** THAY ĐỔI HÌNH ẢNH */
    selectImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event: any) => { // called once readAsDataURL is completed
                this.srcFileUpload.push(event.target.result);
            }
            this.file.push([].slice.call(event.target.files));
        }

    }

    /** THAY ĐỔI GIẤY TỜ SỔ HỘ KHẨU */
    public changeImageGiayTo(event: any){
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event: any) => { // called once readAsDataURL is completed
                this.srcFileUploadGiayTo.push(event.target.result);
            }
            this.fileGiayTo.push([].slice.call(event.target.files));
        }
    }
    gethouse() {
        this.roomsv.getCity().then((data: any) => {
            this.tp = data.Tp;
        })
    }
    selectTp($selected: any) {
        const currentCity = this.tp[$selected];
        this.Quans = currentCity.states;
        this.addressCity = this.tp[$selected].name;

    }
    selectQ($selected: any) {
        const currentWard = this.Quans[$selected];
        this.Ward = currentWard.Ward
        this.addressDitrict = this.Quans[$selected].name + ',' + this.addressCity;
    }

    selectW($selected: any) {
        const currentStreet = this.Ward[$selected];
        this.Street = currentStreet.street;
        this.addressWrad = this.Ward[$selected].NameWard + ',' + this.addressDitrict;
    }
    selectS($selected: any) {
        this.formAddPostNew.value.address = this.Street[$selected].Namestreet + ',' + this.addressWrad;
    }
    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }
}
