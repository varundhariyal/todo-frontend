import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MultiTodoService {
  private url = `http://localhost:3306/api/v1/multitodo/`
  constructor(private http: HttpClient) { }

  //method to add todo item (multi todo)
  public addTodoItem(data): Observable<any> {
    const params = new HttpParams()
      .set('title', data.title)
      .set('isCompleted', data.isCompleted)
      .set('createdBy', data.createdBy)
      .set('editedBy', data.editedBy)
      .set('remarks', data.remarks)
    return this.http.post(`${this.url}addMultiTodo`, params)
  }

  //method to edit a multi todo
  public editMultiTodo(data): Observable<any> {
    const params = new HttpParams()
      .set('multiTodoId', data.multiTodoId)
      .set('title', data.title)
      .set('editedBy', data.editedBy)
      .set('remarks', data.remarks)
    return this.http.post(`${this.url}editMultiTodo`, params)
  }

  //method to get all multi todo
  public getMultiTodo(): Observable<any> {
    return this.http.get(`${this.url}getAllMultiTodo`)
  }

  //method to get a multitodo transaction
  public getMultiTodoTransaction(): Observable<any> {
    return this.http.get(`${this.url}getPreviousTransaction`)
  }

  //method to get a multitodo transaction with trn id
  public getMultiTodoTrn(multiTodoId:string): Observable<any> {
    return this.http.get(`${this.url}getMultiTodoTrn/${multiTodoId}`)
  }

//method to undo/revert change
public undoHistory(multiTodoId:any,obj:any):Observable<any>{
  const params=new HttpParams()
  .set('transactionId',obj.transactionId)
  return this.http.post(`${this.url}undoHistory/${multiTodoId}`,params)
}

//method to delete a multi todo
public deleteMultiTodo(obj:any):Observable<any>{
  const params=new HttpParams()
  .set('multiTodoId',obj.multiTodoId)
  return this.http.post(`${this.url}deleteMultiTodo`,params)
}

  //http error handler
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
}
