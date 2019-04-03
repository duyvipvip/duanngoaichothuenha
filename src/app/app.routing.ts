import { RouterModule, Routes } from '@angular/router';
import { Page404ComponentComponent } from "./page404-component/page404-component.component";
import { NgModule } from '../../node_modules/@angular/core';
import { AppComponent } from './app.component';
const routes: Routes = [
    {
        path: '', component: AppComponent, children: [
            { path: '', redirectTo: 'client', pathMatch: 'full' },
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            },
            {
                path: 'client',
                loadChildren: './client/client.module#ClientModule'
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            },
        ]
    },
    { path: '**', component: Page404ComponentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RootRoutingModule { }