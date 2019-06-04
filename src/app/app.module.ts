import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHandleService } from './user-handle.service';
import { TodolistService } from './todolist.service';
// httpclient
import { HttpClientModule } from "@angular/common/http";
//import toastr module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//cookie module
import { CookieModule } from 'ngx-cookie';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './user-management/signup/signup.component';
import { UserManagementModule } from './user-management/user-management.module';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';

//loader import and properties
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';
import { NotFoundViewComponent } from './error-handler-view/not-found-view/not-found-view.component';
import { ServerErrorViewComponent } from './error-handler-view/server-error-view/server-error-view.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'red',
  // logoUrl:'./assets/fav.png',
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 10, // progress bar thickness
  pbColor: 'red'
};



@NgModule({
  declarations: [
    AppComponent,
    NotFoundViewComponent,
    ServerErrorViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserManagementModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    CookieModule.forRoot(),
    PaginationModule.forRoot(),
    //loader imports
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right'
      }
    ),
    RouterModule.forRoot([
      { path: '', redirectTo: 'signup', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent, pathMatch: 'full' },
      { path: 'notfound', component: NotFoundViewComponent, pathMatch: 'full' },
      { path: 'servererror', component: ServerErrorViewComponent, pathMatch: 'full' },
      { path: '*', component: NotFoundViewComponent, pathMatch: 'full' },
      { path: '**', component: NotFoundViewComponent, pathMatch: 'full' }

    ])
  ],
  providers: [UserHandleService, TodolistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
