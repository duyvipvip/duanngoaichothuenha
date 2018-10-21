import { LienheComponent } from './lienhe/lienhe.component';
import { LichsuComponent } from './lichsu/lichsu.component';
import { BaidangComponent } from './baidang/baidang.component';
import { HomeComponent } from './../client/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'home', component: HomeAdminComponent },
            { path: 'baidang', component: BaidangComponent},
            {path: 'contact', component: LienheComponent},
            {path: 'lichsu', component: LichsuComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdiminRoutingModule { }
