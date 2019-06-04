import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private url = `http://localhost:3306/api/v1/singletodo/`
  private userUrl = `http://localhost:3306/api/v1/users/`
  constructor(private http: HttpClient) { }

  //method to create new empty list
  public newEmptyList(userId, data): Observable<any> {
    const params = new HttpParams()
      .set('listTitle', data)
    return this.http.post(`${this.url}create/${userId}`, params)
  }

  //method to get lists of user logged in via userId
  public getListOfLoggedInUser(userId, skip): Observable<any> {
    return this.http.get(`${this.url}getuserlist/${userId}?skip=${skip}`)
  }

  //method to get particular list with listId
  public getSingleList(listId): Observable<any> {
    return this.http.get(`${this.url}getsinglelist/${listId}`)
  }

  //method to create new item in list
  public addNewItem(listId, itemName): Observable<any> {
    const params = new HttpParams()
      .set('itemName', itemName)
    return this.http.post(`${this.url}additem/${listId}`, params)
  }
  //method to add child item in list
  public addChildItem(listId, itemId, data): Observable<any> {
    const params = new HttpParams()
      .set('itemId', data.itemId)
      .set('subItemName', data)
    return this.http.post(`${this.url}addchilditem/${listId}/${itemId}`, params)
  }

  //method to edit itemName
  public editItem(listId, itemId, data): Observable<any> {
    const params = new HttpParams()
      .set('itemName', data.itemName)
    return this.http.post(`${this.url}edititem/${listId}/${itemId}`, params)
  }

  //method to delete a list
  public deleteList(listId): Observable<any> {
    let data = []
    return this.http.post(`${this.url}deleteList/${listId}`, data)
  }
  //method to delete item
  public deleteItem(listId, itemId): Observable<any> {
    //pass an empty object,as post rquest requires data to be passed as default
    let data = []
    return this.http.post(`${this.url}deleteitem/${listId}/${itemId}`, data)
  }

  //method to delete subitem
  public deleteSubItem(listId, itemId, subItemId): Observable<any> {
    //pass an empty object,as post rquest requires data to be passed as default
    let data: any
    return this.http.post(`${this.url}deletesubitem/${listId}/${itemId}/${subItemId}`, data)
  }

  //method item todo completed
  public isCompleted(listId, itemId, data): Observable<any> {
    const params = new HttpParams()
      .set('isCompleted', data.isCompleted)
    return this.http.post(`${this.url}isCompleted/${listId}/${itemId}`, params)
  }

//method to logout
public logout(data):Observable<any>{
  const params=new HttpParams()
  .set('userId',data.userId)
  return this.http.post(`${this.userUrl}logout`,params)
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
