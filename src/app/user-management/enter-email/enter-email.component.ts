import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserHandleService } from 'src/app/user-handle.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {
  Email:string

  constructor(private router:Router,private toastr:ToastrService,private UserService:UserHandleService) { }

  ngOnInit() {
  }
sendMail=()=>{
  if(!this.Email){
    this.toastr.warning("Enter Registered Mail")
  }
  else{
    let data={
      Email:this.Email
    }
    this.UserService.sendMail(data).subscribe( //only subscribing to it will send mail..
    )//end subscribe
  setTimeout(()=>{
    this.toastr.success('Reset Email Link Sent to EmailId')
    this.router.navigate(['/login'])
  },2000)
  }
}
}
