import { UserService } from './../../../@http-service/user.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditUserComponent } from './edit-user/edit-user.component';
@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
    private dataSource: any = [];
    private username: string;
    private email: string;
    private phone: string;
    private selectUser:any;
    constructor(private modalService: BsModalService,
        private userservice: UserService
    ) { }

    ngOnInit() {
       this.userservice.getAllUser()
            .then((res)=>{
                for(let i=0 ;i<res.length;i++){
                    res[i].position = i+1;
                }
                this.dataSource = res;
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'chucnang'];

    getUser(user){
        this.selectUser = user;
    }
    /** CHỈNH SỬA */
    updateUser(){
        console.log('dsds');
        
        this.userservice.UpdateByAdmin(this.selectUser)
            .then((res)=>{
                console.log("success");
            })
            .catch((err)=>{
                console.log(err);
                
            })
        
    }
    
    /** XOÁ */
    deleteUser(){ 
        this.userservice.DeleteUser(this.selectUser._id)
            .then(res =>{
                console.log("sads");
            })
    }
}
