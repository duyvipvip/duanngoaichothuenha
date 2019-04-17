import { Component, OnInit } from '@angular/core';
import { ISendRentHouse } from 'src/@shared/interface';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-guiyeucauthuenha',
    templateUrl: './guiyeucauthuenha.component.html',
    styleUrls: ['./guiyeucauthuenha.component.scss']
})
export class GuiyeucauthuenhaComponent implements OnInit {
    public model: ISendRentHouse;
    public idngoinha: string;
    // OBJECT DU LIEU
    public Form: FormGroup
    public invalidSodienthoai = false;
    public invalidChungminhthu = false;
    public invalidNote = false;
    public invalidTennguoigui = false;
    public invalidDiachi = false;
    public srcFileUpload: Array<any> = [];
    public file: Array<File> = [];
    constructor(private taoYeuCauThueNhaService: TaoYeuCauThueNhaService,
        private toastr: ToastrService,
        private bsmodalRef: BsModalRef,
        private fb: FormBuilder,
    ) { }


    ngOnInit() {
        this.Form = this.fb.group({
            chungminhthu: ['', Validators.required],
            sodienthoai: ['', Validators.required],
            note: ['', Validators.required],
            diachi: ['', Validators.required],
            tennguoigui: ['', Validators.required],
            idngoinha: [this.idngoinha],
        })
    }

    public Submit() {
        this.invalidSodienthoai = this.invalidTennguoigui = this.invalidNote = this.invalidNote = this.invalidDiachi = this.invalidChungminhthu = this.Form.valid;
        if (this.Form.valid) {
            this.taoYeuCauThueNhaService.taoYeuCauThueNha(this.Form.value, this.file).then((data) => {
                this.toastr.success("Gửi Thông Tin Thành Công");
                this.bsmodalRef.hide();
            })
        } else {
            this.invalidSodienthoai = this.invalidTennguoigui = this.invalidNote = this.invalidNote = this.invalidDiachi = this.invalidChungminhthu = true;
        }
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
}
