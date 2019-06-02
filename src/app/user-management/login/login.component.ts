import { Component, OnInit } from '@angular/core';
import Typed from "typed.js";
import { Router } from '@angular/router';
import { UserHandleService } from 'src/app/user-handle.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from "ng2-cookies/ng2-cookies";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email: string
  Password: string

  constructor(private router: Router, private UserService: UserHandleService, private toastr: ToastrService) { }

  ngOnInit() {
    var options = {
      strings: ["Cook Dinner", "Call Mom", "Get Groceries", "Pay Bill", "Attend Meeting"],
      typeSpeed: 100,
      smartBackspace: true,
      // time before typing starts
      startDelay: 500,
      // backspacing speed
      backSpeed: 150,
      // time before backspacing
      backDelay: 600,
      // loop
      loop: true,
      // false = infinite
      loopCount: 1000,
      // show cursor
      showCursor: false,
      // character for cursor
      cursorChar: "|",
    }
    //getting class name 'typed and passing object options
    var typed = new Typed(".typed", options);
  }
  public login = () => {
    if (!this.Email) {
      this.toastr.warning("Please Enter Email")
    }
    else if (!this.Password) {
      this.toastr.warning('Please Enter Password')
    }
    else {
      let data = {
        Email: this.Email,
        Password: this.Password
      }
      this.UserService.login(data).subscribe(
        response => {
          console.log(response)
          if (response.status == 200) {
            Cookie.set('authToken', response.data.authToken)
            Cookie.set('userId', response.data.userDetails.userId)
            Cookie.set('userName', response.data.userDetails.FirstName + ' ' + response.data.userDetails.LastName)
            this.UserService.setUserInfoInLocalStorage(response.data.userDetails) //userDetails saved in local storage
            this.toastr.success('Login Success')
            this.router.navigate(['/dash', response.data.userDetails.userId])
          }
          else {
            this.toastr.error(response.message)
          }
        },
        error => {
          console.log(error)
          if (error.status == 404 || error.status == 400) {
            this.toastr.error(error.error.message)
          }
          else if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      ) //end subscribe
    }
  }//end login

}
