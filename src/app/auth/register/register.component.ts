import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../@http-service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  username: string;
  password: string;
  password1: string;
  constructor(
    private userservice: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  register() {
    let body: any;
    if (!this.username || !this.email || !this.password || !this.password1) {
      this.toastr.error('a field empty', '')
    }
    if (this.password != this.password1) {
      this.toastr.error('error password', '')
    }
    else{
      body = { username: this.username, password: this.password, email: this.email }
    }
    
    this.userservice.createUser(body)
      .then((res) => {
          this.toastr.success('success', '')
          this.router.navigate(['auth/login'])
      })
      .catch((err) => {
        this.toastr.error(err.error.message, '')
      })
  }

}
