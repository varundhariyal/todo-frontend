import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from 'src/app/socket.service';
import { ToastrService } from 'ngx-toastr';
import { UserHandleService } from 'src/app/user-handle.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: []
})
export class NavComponent implements OnInit, OnDestroy {
  userId: string
  authToken: string
  verifyUser:Subscription
  multitoDo:Subscription
  friendNotification:Subscription
  friendAcceptNotification:Subscription
  constructor(private socketService: SocketService, private toastr: ToastrService,
    private userService: UserHandleService, private router: Router, private cookieService: CookieService) { }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('I am groot')
    this.verifyUser.unsubscribe();
    this.multitoDo.unsubscribe();
    this.friendNotification.unsubscribe();
    this.friendAcceptNotification.unsubscribe();
  }
  ngOnInit() {
    console.log('I am in nav');
    this.userId = Cookie.get('userId')
    this.authToken = Cookie.get('authToken')
    console.log(this.authToken)
    if (this.authToken !== '' || this.authToken !== null || this.authToken !== undefined) {
      this.verifyUserConfirmation();
      this.getNotifications();
      this.getFriendAcceptNotification();
    }
  }
  public verifyUserConfirmation = () => {

    this.verifyUser = this.socketService.verifyUser().subscribe(
      response => {
        console.log('Hey I am inside Set user');
        this.socketService.setUser(this.authToken)
      }
    )
  }

  //method to get friend request received notification
  public getNotifications = () => {
    this.friendNotification = this.socketService.friendNotification(this.userId).subscribe(
      response => {
        console.log(response)
        this.toastr.success(response.message)
      }
    )
    this.multitoDo = this.socketService.multiToDoCreate(this.userId).subscribe(
      response => {
        console.log(response)
        this.toastr.success(response)
      }
    )
  }

  //method to get friend request accepted notification
  public getFriendAcceptNotification = () => {
    this.friendAcceptNotification = this.socketService.friendAcceptNotification(this.userId).subscribe(
      response => {
        console.log(response)
        this.toastr.success(response.message)
      },
      err => {
        this.toastr.error(err)
      }
    )
  }
  //logout method
  public logout = () => {
    let data = {
      userId: this.userId
    }
    this.userService.logout(data).subscribe(
      response => {
        console.log(response)

        if (response.status === 200 || response.status === 404) {
          this.cookieService.removeAll();

          this.router.navigate(['/']);
          this.toastr.success('You are logged out!')
          this.socketService.disconnectSocket()
        }
        else if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      err => {
        this.toastr.error(err.message)
        if (err.status == 500) {
          this.router.navigate(['/servererror'])
        }
      }
    )
  }
}
