import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
//forms module
import { FormsModule } from "@angular/forms";
//scrollmodule
import { NgsRevealModule } from "ngx-scrollreveal";
import { RouterModule } from '@angular/router';
import { UserHandleService } from '../user-handle.service';
import { HttpClientModule } from '@angular/common/http';
import { EnterEmailComponent } from './enter-email/enter-email.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent, ForgetPassComponent, EnterEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgsRevealModule,
    HttpClientModule,
    DashboardModule,
    RouterModule.forChild([
      {path:'login',component:LoginComponent},
      {path:'forget',component:EnterEmailComponent},
      {path:'setpassword',component:ForgetPassComponent}
    ])
  ],
  providers:[UserHandleService]
})
export class UserManagementModule { }
