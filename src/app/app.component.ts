import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LiveTo-Do';
  authToken: string
  constructor(private socketService: SocketService, private toastr: ToastrService) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken')
    console.log(this.authToken)
    if (this.authToken !== '' || this.authToken !== null || this.authToken !== undefined) {
      this.verifyUserConfirmation()
    }
  }

  //method to verify user using socket service by passing authToken
  public verifyUserConfirmation = () => {

    this.socketService.verifyUser().subscribe(
      response => {
        this.socketService.setUser(this.authToken)
      }
    )
  }

}
