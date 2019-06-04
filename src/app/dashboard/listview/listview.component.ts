import { Component, OnInit } from '@angular/core';
import { TodolistService } from 'src/app/todolist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  userId: string
  myName: string
  listTitle: string
  listCreatedOn: any
  myItemList = []
  itemName: string
  editItemName: string
  subItemName: string
  editSubItemName: string
  listId: string
  itemId: string
  subItemId: string
  showMe: boolean = true
  isCompleted = true
  completed = []; //isCompleted verify
  textDecorate: string;
  edited: string;
  constructor(private todoservice: TodolistService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {

    this.myName = Cookie.get('userName')
  }

  ngOnInit() {
    this.userId = Cookie.get('userId')
    this.listId = this.route.snapshot.paramMap.get('listId')
    this.getSingleList()
  }

  //method to hide a div
  hideElement() {
    this.showMe = false
  }
  //method to show a div
  showElement(itemId: string) {
    this.edited = itemId
    this.showMe = true;
  }

  //method to get particular list with listId
  public getSingleList = () => {
    if (!this.listId) {
      this.toastr.error("Error Getting list:No list ID")
    }
    else {
      this.todoservice.getSingleList(this.listId).subscribe(
        response => {
          console.log(response)
          this.listTitle = response.data.listTitle
          this.listCreatedOn = response.data.createdOn
          this.myItemList = response.data.children
          console.log(this.myItemList)
          for (let x of response.data.children) {
            console.log(x)
            if (x.isCompleted === true) {
              this.textDecorate = "line-through" //ngStyle expression
            }
            else if (x.isCompleted === false) {
              this.textDecorate = "none"
            }
          }
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        error => {
          this.toastr.error(error.message)
          if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
          console.log(error)
        }
      )
    }
  }

  //method to add item in list

  addItem = () => {
    if (this.itemName == '' || this.itemName == null || this.itemName == undefined) {
      this.toastr.warning('Enter An Todo Item')
    }
    else {
      let itemName = this.itemName
      this.todoservice.addNewItem(this.listId, itemName).subscribe(
        response => {
          if (response.status == 200) {
            console.log(response)
            this.toastr.success("Item Added")
            this.getSingleList()

          }
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        error => {
          this.toastr.error(error.message)
          if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      )
    }
  } //end addItem

  //method to add subitem/childitem in list

  addChildItem = (itemId: any, title) => { //passing itemId from argumaent in html view

    if (title.value == '' || title.value == null || title.value == undefined) {
      this.toastr.info('Enter An Todo Sub/Child Item')
    }
    else {

      this.todoservice.addChildItem(this.listId, itemId, title.value).subscribe(
        response => {
          if (response.status == 200) {
            console.log(response)
            this.toastr.success('Child Item/Sub ToDo created successfully')
            this.getSingleList()
          }
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        error => {
          this.toastr.error(error.message)
          if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      )
    }
  } //end addchilditem

  //method to handle view
  public handleView = (itemId) => {
    this.edited = itemId;
    this.hideElement()
    console.log(this.edited)
  }

  //method to edit item
  editItem = (itemId: any) => {

    if (this.editItemName == '' || this.editItemName == null || this.editItemName == undefined) {
      this.toastr.warning('Enter An Todo Item Name')
    }
    else {
      let data = {
        itemName: this.editItemName
      }
      this.todoservice.editItem(this.listId, itemId, data).subscribe(
        response => {
          if (response.data.nModified == 1) { //if nModified=1 that means update in value
            console.log(response)
            this.edited = "";
            this.editItemName = "";
            this.toastr.success('ToDo Item/Task Edited Successfully')
            this.getSingleList()
          }
          if (response.status == 500) {
            this.router.navigate(['/servererror'])
          }
        },
        error => {
          this.toastr.error(error.message)
          if (error.status == 500) {
            this.router.navigate(['/servererror'])
          }
        }
      )
    }
  } //end editItem

  //method item todo completed
  itemCompleted = (itemId: any) => {
    let data = {
      isCompleted: this.isCompleted
    }
    this.todoservice.isCompleted(this.listId, itemId, data).subscribe(
      response => {
        if (response.status == 200) {
          console.log(response)
          this.toastr.success('Hurray Item ToDo Completed!')
          this.getSingleList()
        }
        if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      err => {
        console.log(err.err.message)
        this.toastr.error(err.message)
        if (err.status == 500) {
          this.router.navigate(['/servererror'])
        }
      }
    )
  }

  //method to delete item from list with parameter itemId
  deleteItem = (itemId: any) => {
    //itemId is passed in html component.

    this.todoservice.deleteItem(this.listId, itemId).subscribe(
      response => {
        console.log(response)

        setTimeout(() => {
          this.toastr.success('Item Deleted Successfully')
          this.router.navigate(['/listview', this.listId])
          this.getSingleList()
        }, 1000);
        if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      error => {
        this.toastr.error(error.message)
        if (error.status == 500) {
          this.router.navigate(['/servererror'])
        }
      }
    )
  } //end deleteitem


  //method to delete sub item from list
  deleteSubItem = (itemId: any, subItemId: any) => {
    this.todoservice.deleteSubItem(this.listId, itemId, subItemId).subscribe(
      response => {
        console.log(response)
        this.toastr.success('Sub Item Deleted Successfully')
        this.getSingleList()
        if (response.status == 500) {
          this.router.navigate(['/servererror'])
        }
      },
      error => {
        this.toastr.error(error.message)
        if (error.status == 500) {
          this.router.navigate(['/servererror'])
        }
      }
    )
  } //end deleteSubItem

}
