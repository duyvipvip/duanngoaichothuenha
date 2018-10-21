import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Page404ComponentComponent } from './page404-component/page404-component.component';
import { RootRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        Page404ComponentComponent,
    ],
    imports: [
        BrowserModule,
        RootRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBBnwLr1x3XC6YbJXlSHQAkR1xZ88jqNWE',
            libraries: ["places"]
          }),
        // ToastrModule.forRoot()
    ],
    
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
