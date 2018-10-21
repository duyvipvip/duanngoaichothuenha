import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../../@http-service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

@Component({
    selector: 'app-infouser',
    templateUrl: './infouser.component.html',
    styleUrls: ['./infouser.component.scss']
})
export class InfouserComponent implements OnInit {
    formAddUser: FormGroup;
    formPassword: FormGroup;
    formAvatar: FormGroup;
    file: File;
    user: any;
    constructor(private fb: FormBuilder, private usersv: UserService, private toastr: ToastrService) {
        this.user = JSON.parse(localStorage.getItem('data')).user;

    }
    
    ngOnInit() {

        this.formPassword = this.fb.group({
            password_old: [],
            new_password: [],
            retype_new_password: []
        }),
            this.formAddUser = this.fb.group({
                username: [this.user.username],
                password: [],
                email: [this.user.email],
                phone: [this.user.phone],
                sex: [],
                address: [this.user.address],
                role: [],
                avatar: [],
                localtion: []
            });

    }
    selectImage($event) {
        this.file = $event.target.files[0] || $event.srcElement.files[0];
    }
    public updateUser() {
        console.log(this.formAddUser, 'dsd');

        this.usersv.updateUser(this.formAddUser.value)
            .then((data) => {
                this.toastr.success('success', '')
            })

    }
    public changePassword() {
        if (!this.formPassword.value.password_old) {
            this.toastr.error('a field is empty', 'Fail');
            return;
        }
        if (this.formPassword.value.new_password != this.formPassword.value.retype_new_password) {
            this.toastr.error('You must enter the same password twice in order to confirm it', 'Fail');
            return;
        }
        this.usersv.changePassword(this.formPassword.value)
            .then(() => {
                this.toastr.success('success', 'Đổi mật khẩu thành công')
            })
            .catch((err) => {
                this.toastr.success('error', err.error.message);
            })

    }
    public changeAvatar() {
        const Formavatar = new FormData();
        Formavatar.append('files', this.file);
        this.usersv.UploadAvatar(Formavatar)
        .then(() => {
            this.toastr.success('success', 'Cập Nhật Avartar Thành Công')
        })
        .catch((err) => {
            this.toastr.success('error', err.error.message);
        })
    }
}