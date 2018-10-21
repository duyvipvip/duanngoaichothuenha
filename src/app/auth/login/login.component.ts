import { UserService } from './../../../@http-service/user.service';
import { ToastrService } from 'ngx-toastr';
 import { AuthService } from './../../../@http-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    femail: String = '';
    email: String = '';
    password:String = '';
    constructor(
        private toastr: ToastrService,
         private authService: AuthService,
        private router: Router,
        private usersv: UserService
    ) {
    }

    ngOnInit() {
        if(localStorage.getItem('data')) {
            this.router.navigate(['client']);
        }

    }

    login(){
        let body = {email:this.email,password:this.password}       
        this.authService.Login(body)
            .then((data)=>{
                localStorage.setItem('data', JSON.stringify(data));
                this.toastr.success('Success','')
                this.router.navigate(['/client']);
            })
            .catch((err)=>{
                this.toastr.error('Error',err.error.message)
            })
    }
    /** QUA TRANG DANG9 KÍ */
    register(){
        this.router.navigate(['auth/register']);

    }
    forgetpassword(){
        let body = {email:this.femail}
        this.usersv.forgetPassword(body)
            .then((err)=>{
                this.toastr.success('vui long vào mail kiểm tra','')
            })
    }

}
