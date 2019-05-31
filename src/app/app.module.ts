import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHandleService } from './user-handle.service';
import { TodolistService } from './todolist.service';
// httpclient
import { HttpClientModule } from "@angular/common/http";
//import scroll module
import { NgsRevealModule } from "ngx-scrollreveal";
//import toastr module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './user-management/signup/signup.component';
import { UserManagementModule } from './user-management/user-management.module';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';

//loader import and properties
import { NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor:'red',
  // logoUrl:'./assets/fav.png',
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 10, // progress bar thickness
  pbColor:'red'
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserManagementModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    NgsRevealModule,
    PaginationModule.forRoot(),
    //loader imports
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'',redirectTo:'signup',pathMatch:'full'},
      {path:'signup',component:SignupComponent,pathMatch:'full'}
    ])
  ],
  providers: [UserHandleService,TodolistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
