import { LienheComponent } from './lienhe/lienhe.component';
import { LichsuComponent } from './lichsu/lichsu.component';
import { BaidangComponent } from './baidang/baidang.component';
import { HomeComponent } from './../client/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { YeucauthuenhaComponent } from './yeucauthuenha/yeucauthuenha.component';
import { QuanlyhoahongComponent } from './quanlyhoahong/quanlyhoahong.component';
import { KiemduyetbaidangComponent } from './kiemduyetbaidang/kiemduyetbaidang.component';
import { XemchitietnhaComponent } from './xemchitietnha/xemchitietnha.component';


const routes: Routes = [
    { path: '', redirectTo: 'baidang', pathMatch: 'full' },
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'home', component: HomeAdminComponent },
            { path: 'baidang', component: BaidangComponent},
            { path: 'detailroom/:id', component: XemchitietnhaComponent },
            {path: 'contact', component: LienheComponent},
            {path: 'lichsu', component: LichsuComponent},
            {path: 'quanlynguoithuenha', component: YeucauthuenhaComponent},
            {path: 'quanlyhoahong', component: QuanlyhoahongComponent},
            {path: 'kiemduyetbaidang', component: KiemduyetbaidangComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdiminRoutingModule { }
