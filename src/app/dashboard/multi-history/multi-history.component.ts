import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MultiTodoService } from 'src/app/multi-todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-multi-history',
  templateUrl: './multi-history.component.html',
  styleUrls: ['./multi-history.component.css'],
  providers: [Location]
})
export class MultiHistoryComponent implements OnInit {
  multiTodoId: string
  multiHistory: any = []
  constructor(private location: Location, private multiService: MultiTodoService, private _route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.multiTodoId = this._route.snapshot.paramMap.get('multiTodoId')
    this.getMultiTodoTrn()
  }

  //method to go back using location
  public goBack = () => {
    this.location.back();
  }

  //method to get multitodo transaction for particular multiTodoId
  public getMultiTodoTrn = () => {
    if (this.multiTodoId == null || this.multiTodoId == undefined || this.multiTodoId == '') {
      this.toastr.error('Error fetching todo id/No id present')
    }
    else {
      this.multiService.getMultiTodoTrn(this.multiTodoId).subscribe(
        response => {
          if (response.status == 200 && response !== null) {
            this.multiHistory = response.data
            console.log(this.multiHistory)
          }
        },
        err => {
          this.toastr.error(err.err.message)
        }
      )
    }
  }

  undoAction = () => {
    //obj to undo
    const lastTrnObj = this.multiHistory[this.multiHistory.length-1];
    let obj= {
      transactionId: lastTrnObj.transactionId
    }
    //api call
    this.multiService.undoHistory(this.multiTodoId,obj).subscribe(
      response=>{
        console.log(response)
        this.toastr.success(`Change undoed/reverted successfully`)
        this.getMultiTodoTrn()
      },
      err=>{
        this.toastr.error(err.err.message)
      }
    )
  }
}
