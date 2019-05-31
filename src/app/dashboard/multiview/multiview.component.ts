import { Component, OnInit } from '@angular/core';
import { MultiTodoService } from 'src/app/multi-todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-multiview',
  templateUrl: './multiview.component.html',
  styleUrls: ['./multiview.component.css']
})
export class MultiviewComponent implements OnInit {
  currentPage = 1;
  page: number;
  itmesPerPage: 5

  pageChanged(event: any): void {
    this.page = event.page;
    let pageValue = (this.page - 1) * 5
    this.getMultiTodo(pageValue)
  }
  title: string
  titleEdited: string //new todo title
  userId: string
  userName: string
  remarks: string
  showMe: boolean = true
  edited: string
  todoData: any = [] //array containing todo's info
  todoTransactionData: any = []
  skip: number = 0
  constructor(private multiTodoService: MultiTodoService, private toastr: ToastrService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = Cookie.get('userId')
    this.userName = Cookie.get('userName')
    this.getMultiTodo()
  }

  //method to hide a div
  hideElement() {
    this.showMe = false
  }
  //method to show a div
  showElement() {
    this.showMe = true;
  }

  //method to get all multiTodos
  public getMultiTodo = (skip?: number) => {
    console.log(this.userId)
    //  let data={
    //    userId:this.userId
    //  }
    this.multiTodoService.getMultiTodo(this.userId, skip).subscribe(

      response => {
        console.log(skip)
        if (response !== null || response.status == 200) {
          console.log(response)
          this.todoData = response.data
        }
      },
      err => {
        this.toastr.error(err.message)
      }
    )
  }

  //method to add a todo item (multiTodo)
  public addTodoItem = () => {
    if (this.title == null || this.title == undefined || this.title == '') {
      this.toastr.warning('Please enter todo title')
    }
    else {
      let data = {
        title: this.title,
        isCompleted: false,
        createdBy: this.userId,
        remarks: `${this.userName} created a todo ${this.title}`
      }
      this.multiTodoService.addTodoItem(data).subscribe(
        response => {
          if (response !== null || response.status == 200) {
            this.toastr.success('Todo created successfully')
            this.getMultiTodo()
          }
        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }
  }

  //method to handle view
  public handleView = (itemId: string) => {
    this.edited = itemId;
    this.hideElement()
    console.log(this.edited)
  }

  //edit a multiTodo
  public editMultiTodo = (multiTodoId: string, title: string) => {
    console.log(multiTodoId)
    this.hideElement()
    if (this.titleEdited == null || this.titleEdited == undefined || this.titleEdited == '') {
      this.toastr.warning('Please enter a todo title')
    }
    else {
      let data = {
        multiTodoId: multiTodoId,
        title: this.titleEdited,
        editedBy: this.userId,
        remarks: `${this.userName} changed the title from ${title} to ${this.titleEdited}`
      }
      this.multiTodoService.editMultiTodo(data).subscribe(
        response => {
          console.log(response)
          this.edited = "";
          this.titleEdited = "";
          this.showElement()
          this.getMultiTodo()
        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }
  }

  //method to delete a multi todo
  public deleteMultiTodo = (multiTodoId) => {
    if (confirm('Do you really want to delete this item?')) {

      let obj = {
        multiTodoId: multiTodoId
      }
      this.multiTodoService.deleteMultiTodo(obj).subscribe(
        response => {
          console.log(response)
          this.toastr.success(`Multi Todo Deleted Successfully`)
          this.getMultiTodo()
        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }

  }

}
