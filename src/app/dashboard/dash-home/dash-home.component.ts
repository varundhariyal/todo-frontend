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
  itmesPerPage = 5
  totalItems: number;
  pageChanged(event: any): void {
    this.page = event.page;
    let pageValue = (this.page - 1) * 5
    this.getAllListOfUser(pageValue)
  }
  myName: string
  allList: any
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
        if (response.data == null) {
          this.allList = ''
        }
        if (response.data !== null) {
          this.totalItems = response.data.totalItems;
          this.allList = response['data'].fetchedList;
        }
        if (response.status === 404) {
          this.toastr.info('Currently no todo list is created')
        }
        else if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      err => {
        console.log(err)
        this.toastr.error(`Error creating a new list ${err}`)
        if (err.status == 500 || err.status == 0) {
          this.router.navigate(['/servererror'])
        }
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
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        err => {
          console.log(err)
          this.toastr.error(`Error creating a new list ${err}`)
          if (err.status == 500 || err.status == 0) {
            this.router.navigate(['/servererror'])
          }
        }
      )
    }
  }//end createNewEmptyList

  //delete a list
  public deleteList = (listId: any) => {
    this.todoService.deleteList(listId).subscribe(
      response => {
        console.log(response)
        this.toastr.success("List deleted successfully")
        this.getAllListOfUser()
        if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      err => {
        this.toastr.error(err.message)
        if (err.status == 500 || err.status == 0) {
          this.router.navigate(['/servererror'])
        }
      }
    )
  }  //end deleteList

}
