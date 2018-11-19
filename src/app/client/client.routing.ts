import { HistoryComponent } from './history/history.component';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import { PostnewsComponent } from './postnews/postnews.component';
import { TabuserComponent } from './tabuser/tabuser.component';
import { MangermentPostnewsComponent } from './mangerment-postnews/mangerment-postnews.component';
import { GoogleMapComponent } from './google-map/google-map.component';

const routes: Routes = [
    {
        path: '', component: ClientComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'postnews', component: PostnewsComponent },
            { path: 'detailroom/:id', component: DetailRoomComponent },
            { path: 'infouser', component: TabuserComponent },
            { path: 'mangermentPostnew', component: MangermentPostnewsComponent },
            {path: 'history',component:HistoryComponent},
            {path: 'googlemap',component:GoogleMapComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
