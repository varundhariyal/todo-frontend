import { Component, OnInit } from '@angular/core';
import { MultiTodoService } from 'src/app/multi-todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-multiview',
  templateUrl: './multiview.component.html',
  styleUrls: ['./multiview.component.css']
})
export class MultiviewComponent implements OnInit {
  title: string
  titleEdited: string //new todo title
  userId: string
  userName: string
  remarks: string
  showMe: boolean = true
  edited: string
  todoData: any = [] //array containing todo's info
  todoTransactionData: any = []
  lastTransaction: any=[] //array of last element/obj of todoTransactionData array
  constructor(private multiTodoService: MultiTodoService, private toastr: ToastrService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = Cookie.get('userId')
    this.userName = Cookie.get('userName')
    this.getMultiTodo()
    this.getMultiTodoTransaction()
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
  public getMultiTodo = () => {
    this.multiTodoService.getMultiTodo().subscribe(
      response => {
        if (response !== null || response.status == 200) {
          console.log(response)
          this.todoData = response.data
        }
      },
      err => {
        this.toastr.error(err.err.message)
      }
    )
  }

  //method to get transaction
  public getMultiTodoTransaction = () => {
    this.multiTodoService.getMultiTodoTransaction().subscribe(
      response => {
        if (response !== null || response.status == 200) {
          console.log(response)
          this.todoTransactionData = response.data
          //to get only last element/obj of array pulled out a neat trick
          // this.lastTransaction=response.data.slice(-1)[0]
          this.lastTransaction=this.todoTransactionData.slice(-1)[0]
          console.log(this.lastTransaction)
        }
      },
      err => {
        this.toastr.error(err.err.message)
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
          this.getMultiTodoTransaction()

        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }
  }

  //method to delete a multi todo
  public deleteMultiTodo=(multiTodoId)=>{
    let obj={
      multiTodoId:multiTodoId
    }
    this.multiTodoService.deleteMultiTodo(obj).subscribe(
      response=>{
        if(response.nModified==1){
          this.toastr.success(`Multi Todo Deleted Successfully`)
        }
      },
      err=>{
        this.toastr.error(err.err.message)
      }
    )
  }

}
