import { ToastrModule } from 'ngx-toastr';
 import { AuthService } from './../../@http-service/auth.service';
import { UserService } from './../../@http-service/user.service';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../@shared/shared.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
        ToastrModule.forRoot() // ToastrModule added
    ],
    providers: [UserService,AuthService],
    declarations: [
        LoginComponent,
        AuthComponent,
        RegisterComponent
    ]
})
export class AuthModule { }
