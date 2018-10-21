import { HistoryService } from 'src/@http-service/history.service';
import { ToastrModule } from 'ngx-toastr';
import { ContactService } from 'src/@http-service/contact.service';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client.routing';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../@shared/shared.module';
import { MenuclientComponent } from './layoutclient/menuclient/menuclient.component';
import { FooterclientComponent } from './layoutclient/footerclient/footerclient.component';
import { PostnewsComponent } from './postnews/postnews.component';
import { HeaderclientComponent } from './layoutclient/headerclient/headerclient.component';
import { TabuserComponent } from './tabuser/tabuser.component';
import { InfouserComponent } from './tabuser/infouser/infouser.component';
import { AgmCoreModule } from '@agm/core';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { MangermentPostnewsComponent } from './mangerment-postnews/mangerment-postnews.component';
import { BaidangComponent } from './tabuser/baidang/baidang.component';
import { HistoryComponent } from './history/history.component'; 
@NgModule({
    imports: [
        ClientRoutingModule,
        SharedModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBBnwLr1x3XC6YbJXlSHQAkR1xZ88jqNWE',
            libraries: ["places"]
          }),
          ToastrModule.forRoot() // ToastrModule added
    ],
    exports: [],
    declarations: [
        ClientComponent,
        HomeComponent,
        MenuclientComponent,
        FooterclientComponent,
        PostnewsComponent,
        HeaderclientComponent,
        InfouserComponent,
        TabuserComponent,
        DetailRoomComponent,
        MangermentPostnewsComponent,
        BaidangComponent,
        HistoryComponent
    ],
    providers: [ContactService,HistoryService],
})
export class ClientModule { }
