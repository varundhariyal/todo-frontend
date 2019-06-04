import { Component, OnInit } from '@angular/core';
import Typed from "typed.js";
// json import
import * as CountryCo from '../../countryCode/countryCode.json';
import { UserHandleService } from 'src/app/user-handle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  FirstName: string
  LastName: string
  Email: string
  MobileNumber: number
  CountryCode = '';
  Password: string
  countries = [];
  PossibleCode = CountryCo['default']
  constructor(private UserService: UserHandleService, private route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.code()
    console.log(CountryCo["default"]);
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

  //method to get country with code
  public code = () => {
    let coutryData = CountryCo;
    let obj = coutryData["default"];
    var result = Object.keys(obj).map(function (key) {
      return { code: key, name: obj[key] };
    });
    this.countries = result;

    // let phoneData = Phone;
    // obj = phoneData["default"];
    // result = Object.keys(obj).map(function (key) {
    //   return { code: key, name: obj[key] };
    // });
    // this.countryCode = result;
  }

  //method for signup
  signup = () => {
    if (!this.FirstName) {
      this.toastr.warning('Please Enter First Name')
    }

    else if (!this.LastName) {
      this.toastr.warning('Please enter Last Name')

    } else if (!this.MobileNumber) {
      this.toastr.warning('Please Enter mobile number!')

    } else if (!this.Email) {
      this.toastr.warning('Please Enter Email')

    } else if (!this.Password) {
      this.toastr.warning('Please enter password!')
    }
    else if (!this.CountryCode) {
      this.toastr.warning('Please enter country code')
    }
    else {
      let data = {
        FirstName: this.FirstName,
        LastName: this.LastName,
        Email: this.Email,
        Password: this.Password,
        CountryCode: this.CountryCode,
        MobileNumber: this.MobileNumber
      }
      this.UserService.signup(data).subscribe(
        response => {
          if (response.status == 200) {
            this.toastr.success("Signup Successfull")
            setTimeout(() => {
              this.route.navigate(['/login'])
            }, 1000)
          }
          else {
            this.toastr.warning(response.message)
          }
        },
        error => {
          console.log(error)
          this.toastr.warning(error.error.message)
          if (error.status == 0 || error.status == 500 || error.error.status == 500) {
            this.route.navigate(['/servererror'])
          }
        }
      ) //end subscribe
    }
  } //end signup method
}
