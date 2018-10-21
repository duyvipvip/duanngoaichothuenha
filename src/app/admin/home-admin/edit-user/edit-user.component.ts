import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../../../node_modules/@angular/forms';
import { IUser } from '../../../../@shared/interface';
import { BsModalRef } from '../../../../../node_modules/ngx-bootstrap/modal';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    public user: IUser;
    public formEditUser: FormGroup;
    public type: string = 'password';
    public isDisable: boolean = true;
    constructor(private fb: FormBuilder,
        public bsModalRef: BsModalRef,) { }

    ngOnInit() {
        this.formEditUser = this.fb.group({
            _id: [''],
            username: ['', Validators.required],
            password: ['', Validators.minLength(6)],
            email: [''],
            role: ['']
          });
    }

    /** ẨN HIỆN PASSWORD */
    toggleShow() {
        this.type = this.type === 'text' ? 'password' : 'text';
    }

    onFileSelected(event){

    }

    editUser(){
        
    }

}
