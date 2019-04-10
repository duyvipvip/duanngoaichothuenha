import { Component, OnInit } from '@angular/core';
import { ISendRentHouse } from 'src/@shared/interface';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-guiyeucauthuenha',
    templateUrl: './guiyeucauthuenha.component.html',
    styleUrls: ['./guiyeucauthuenha.component.scss']
})
export class GuiyeucauthuenhaComponent implements OnInit {
    public model: ISendRentHouse;
    public idngoinha: string;
    constructor(private taoYeuCauThueNhaService: TaoYeuCauThueNhaService,
        private toastr: ToastrService,
        private bsmodalRef: BsModalRef
        ) { }

    ngOnInit() {
        this.model = {
            chungminhthu: '',
            sodienthoai: '',
            note: '',
            diachi: '',
            tennguoigui: '',
            idngoinha: this.idngoinha
        }
    }

    public Submit() {
        this.taoYeuCauThueNhaService.taoYeuCauThueNha(this.model).then((data) => {
            this.toastr.success("Gửi Thông Tin Thành Công");
            this.bsmodalRef.hide();
        })
    }
}
