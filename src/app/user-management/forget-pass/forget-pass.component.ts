import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHandleService } from 'src/app/user-handle.service';
import { ToastrService } from 'ngx-toastr';
import Typed from 'typed.js'

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
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
  ForgetPassword = () => {
    if (!this.Email) {
      this.toastr.warning("Enter Registered Mail")
    }
    else if (!this.Password) {
      this.toastr.warning('Set New Password')
    }
    else {
      let data = {
        Email: this.Email,
        Password: this.Password
      }
      this.UserService.update(data).subscribe(
        response => {
          if (response.data.nModified == 1) {
            this.toastr.success("Password Changed Successfully")
            this.router.navigate(['/login'])
          }
          else if (response.data.nModified == 0) {
            this.toastr.error("No Password Reset")
            this.router.navigate(['/setpassword'])
          }
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        err => {
          console.log(err)
          this.toastr.error(err.message)
        }
      )//end subscribe
    }
  } //end forgetpassword


}