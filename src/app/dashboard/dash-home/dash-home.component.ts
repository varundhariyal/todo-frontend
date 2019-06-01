import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { TodolistService } from 'src/app/todolist.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {
  currentPage = 1;
  page: number;
  itmesPerPage: 5

  pageChanged(event: any): void {
    this.page = event.page;
    let pageValue = (this.page - 1) * 5
    this.getAllListOfUser(pageValue)
  }
  public myName: string
  public allList: any
  userId: string
  listTitle: any

  constructor(private todoService: TodolistService, private toastr: ToastrService, private router: Router, private _route: ActivatedRoute) {

    this.myName = Cookie.get('userName') //fetch userNAme from Cookie
  }

  ngOnInit() {
    this.userId = this._route.snapshot.paramMap.get('userId')
    //calling function on initialization
    this.getAllListOfUser()
  }
  //method to get list of user by userId
  getAllListOfUser = (skip?: number) => {
    this.todoService.getListOfLoggedInUser(this.userId, skip).subscribe(
      response => {
        console.log(response)
        this.allList = response['data']
      }
    ) //end subscribe
  } //end getAllListOfUser

  //method to create new empty list
  createNewEmptyList = () => {
    if (this.listTitle == '' || this.listTitle == null || this.listTitle == undefined) {
      this.toastr.warning("Enter Title For The List")
    }
    else {
      let data = this.listTitle
      this.todoService.newEmptyList(this.userId, data).subscribe(
        response => {
          console.log(response)
          this.toastr.success('New Empty List Created Successfully')
          this.getAllListOfUser()
        },
        err => {
          console.log(err)
          this.toastr.error(`Error creating a new list ${err}`)
        }
      )
    }
  }//end createNewEmptyList

  //delete a list
  deleteList = (listId: any) => {
    this.todoService.deleteList(listId).subscribe(
      response => {
        console.log(response)
        this.toastr.success("List deleted successfully")
        this.getAllListOfUser()
      },
      err => {
        this.toastr.error(err.error.message)
      }
    )
  }  //end deleteList

  //logout method
  public logout = () => {
    let data = {
      userId: this.userId
    }
    this.todoService.logout(data).subscribe(
      response => {
        if (response.status === 200) {
          console.log("logout called")
          Cookie.delete('authtoken');

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
