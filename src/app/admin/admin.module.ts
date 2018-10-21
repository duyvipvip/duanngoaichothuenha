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


@NgModule({
    imports: [AdiminRoutingModule, SharedModule,ToastrModule.forRoot()],
    exports: [],
    declarations: [
        AdminComponent,
        HomeAdminComponent,
        EditUserComponent,
        MenuleftComponent,
        BaidangComponent,
        LienheComponent,
        LichsuComponent
    ],
    entryComponents: [EditUserComponent],
    providers: [HistoryService,ContactService,ToastrService],
})
export class AdminModule { }
