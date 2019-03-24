import { UserService } from './../@http-service/user.service';
import { RoomService } from './../@http-service/room.service';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatSelectModule, MatTableModule, MatTabsModule, MatIconModule} from '@angular/material';
import { CommonModule } from '../../node_modules/@angular/common';
import { CdkTableModule } from '@angular/cdk/table'
import { ModalModule } from '../../node_modules/ngx-bootstrap/modal';
import { CKEditorModule } from 'ngx-ckeditor';
import { RatingService } from 'src/@http-service/rating.service';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        CdkTableModule,
        MatTableModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        CKEditorModule,
        ModalModule.forRoot()
    ],
    exports: [
        FormsModule,
        MatSelectModule, 
        CommonModule,
        CdkTableModule,
        MatTableModule,
        ReactiveFormsModule,
        ModalModule,
        MatTabsModule,
        CKEditorModule,
        MatIconModule
    ],
    declarations: [],
    providers: [RoomService, UserService, RatingService],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
            ],
        };
    }
}
