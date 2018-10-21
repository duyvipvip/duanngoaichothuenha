import { ContactService } from './../../../../@http-service/contact.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footerclient',
  templateUrl: './footerclient.component.html',
  styleUrls: ['./footerclient.component.scss']
})
export class FooterclientComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService) { }

  ngOnInit() {
    this.form = this.fb.group({
      // Validators.required labat buoc phai co
      email: ['',],
      message: ['',],

    });

  }
  Contact() {
    this.contactService.CreateContact(this.form.value)
      .then((data) => {
          this.toastr.success('success','')
      })
      .catch((err)=>{
        this.toastr.error(err,'')
      })
  }

}
