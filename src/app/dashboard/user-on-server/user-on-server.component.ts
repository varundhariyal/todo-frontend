import { Component, OnInit } from '@angular/core';
import { UserHandleService } from 'src/app/user-handle.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-user-on-server',
  templateUrl: './user-on-server.component.html',
  styleUrls: ['./user-on-server.component.css']
})
export class UserOnServerComponent implements OnInit {
  users: any
  userId: string
  receiverId: string
  senderId = [] //array containing sender ids
  senderInfoArray = []
  receiverInfoArray = []
  friendListArray = []
  constructor(private UserService: UserHandleService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.userId = Cookie.get('userId')
    this.UserService.getAllUsers().subscribe(
      response => {
        console.log(response)
        this.users = response.data
        this.users = this.users.filter((x: { userId: any; }) => x.userId !== this.userId)
      },
      err => {
        console.log(err.err.message)
        this.toastr.error(err.err.message)
      }
    )
    this.displayRequest()
  }

  //method to send friend request
  public sendRequest = (receiverId: any) => {
    let data = {
      senderId: this.userId,
      receiverId: receiverId
    }
    this.UserService.sendRequest(data).subscribe(
      response => {
        console.log(response)
        this.toastr.success("Friend Request Sent")
      },
      err => {
        this.toastr.error(err.err.message)
      }
    )

  }

  //method to display sender
  displayRequest = () => {
    if (this.userId == null || this.userId == undefined || this.userId == '') {
      this.toastr.error('No userId/cookie empty')
    }
    else {
      this.UserService.displayRequest(this.userId).subscribe(
        response => {
          console.log(response)
          if (response.data != null) {
            for (let x of response.data) {
              console.log(x)
              //if status is changed to accepted push info to friend list array
              if (x.status == 'accepted') {
                this.friendListArray.push(x.senderData)
                 this.friendListArray.push(x.receiverData)
                 this.friendListArray=this.friendListArray.filter(x=> x.userId!==this.userId)
              } else {
                this.senderId.push(x.senderData.userId);
                this.senderInfoArray.push(x.senderData);
              }
            }
          }
          console.log(this.senderId)
          console.log(this.senderInfoArray)
          console.log(this.friendListArray)
        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }
  }

  //method to accept friend request and update friend list array
  acceptFriendRequest = (sender: { userId: any; }) => {
    let data = {
      status: "accepted",
    }
    this.UserService.acceptRequest(this.userId, sender.userId, data).subscribe(
      response => {
        console.log(response)
        //filter array elements,resultant array will not have sender details whose request is aacepted
        //in senderInfoArray
        this.senderInfoArray = this.senderInfoArray.filter(x => x !== sender);
        this.friendListArray.push(sender);
      }
    )
  }

  //method to delete friend request
  deleteFriendRequest = (senderId: any) => {

    this.UserService.deleteFriendRequest(senderId).subscribe(
      response => {

        console.log(response)
        this.toastr.success(`Friend Request deleted successfully`)

        this.senderInfoArray = this.senderInfoArray.filter(x => x.userId !== senderId);
      },
      err => {
        this.toastr.error(err.err.message)
      }
    )
  }


  //logout method
  public logout = () => {
    let data = {
      userId: this.userId
    }
    this.UserService.logout(data).subscribe(
      response => {
        if (response.status === 200) {
          console.log("logout called")
          Cookie.delete('authToken');

          Cookie.delete('userId');

          Cookie.delete('userName');

          this.router.navigate(['/']);

          this.toastr.success('You are logged out!')
        }
      },
      err => {
        this.toastr.error(err.message)
      }
    )
  }

}
