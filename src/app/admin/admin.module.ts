import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ContactService } from './../../@http-service/contact.service';
import { HistoryService } from 'src/@http-service/history.service';
import { SharedModule } from './../../@shared/shared.module';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdiminRoutingModule } from './admin.routing';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EditUserComponent } from './home-admin/edit-user/edit-user.component';
import { MenuleftComponent } from './layoutadmin/menuleft/menuleft.component';
import { BaidangComponent } from './baidang/baidang.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { LichsuComponent } from './lichsu/lichsu.component';
import { YeucauthuenhaComponent } from './yeucauthuenha/yeucauthuenha.component';
import { QuanlyhoahongComponent } from './quanlyhoahong/quanlyhoahong.component';
import { RentHouseService } from 'src/@http-service/rentHouse.service';
import { ThanhToanService } from 'src/@http-service/thanhtoan.service';
import { StatusPipe } from 'src/@shared/pipe/pipeStatus';
import { KiemduyetbaidangComponent } from './kiemduyetbaidang/kiemduyetbaidang.component';
import { XemchitietnhaComponent } from './xemchitietnha/xemchitietnha.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ModalModule } from 'ngx-bootstrap';
import { TaoYeuCauThueNhaService } from 'src/@http-service/taoyeucauthuenha.service';


@NgModule({
    imports: [AdiminRoutingModule,
        SharedModule,
        ToastrModule.forRoot(),
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBBnwLr1x3XC6YbJXlSHQAkR1xZ88jqNWE',
            libraries: ["places"]
          }),
          AgmDirectionModule,
          ModalModule.forRoot(),
          ToastrModule.forRoot() // ToastrModule added
    ],
    exports: [],
    declarations: [
        StatusPipe,
        AdminComponent,
        HomeAdminComponent,
        EditUserComponent,
        MenuleftComponent,
        BaidangComponent,
        LienheComponent,
        LichsuComponent,
        YeucauthuenhaComponent,
        QuanlyhoahongComponent,
        KiemduyetbaidangComponent,
        XemchitietnhaComponent
    ],
    entryComponents: [EditUserComponent],
    providers: [TaoYeuCauThueNhaService, HistoryService,ContactService,ToastrService, RentHouseService, ThanhToanService],
})
export class AdminModule { }
