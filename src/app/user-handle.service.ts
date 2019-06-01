import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
// import observable
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserHandleService {

  private url = `http://localhost:3306/api/v1/users/`

  constructor(private http: HttpClient) { }

  //method to get user infom from local storage
  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage

  //method to set/send data to local storage
  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))

  }


  //method to signup
  public signup(data): Observable<any> {
    const params = new HttpParams()
      .set('FirstName', data.FirstName)
      .set('LastName', data.LastName)
      .set('Email', data.Email)
      .set('Password', data.Password)
      .set('CountryCode', data.CountryCode)
      .set('MobileNumber', data.MobileNumber)
    return this.http.post(`${this.url}signup`, params)
  }

  //method to login
  public login(data): Observable<any> {
    const params = new HttpParams()
      .set('Email', data.Email)
      .set('Password', data.Password)
    return this.http.post(`${this.url}login`, params)
  }
  //method to reset password
  public update(data): Observable<any> {
    const params = new HttpParams()
      .set('Email', data.Email)
      .set('Password', data.Password)
    return this.http.post(`${this.url}update`, params)
  }

  //method to send mail
  public sendMail(data): Observable<any> {
    const params = new HttpParams()
      .set("Email", data.Email)
    return this.http.post(`${this.url}sendMail`, params)
  }

  //method to get all registered users on server
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}getallusers`)
  }


  //method to send a friend request
  sendRequest(data): Observable<any> {
    const params = new HttpParams()
      .set('senderId', data.senderId)
      .set('receiverId', data.receiverId)
    return this.http.post(`${this.url}sendrequest`, params)
  }

  //method to display friend requests
  displayRequest(receiverId): Observable<any> {
    return this.http.get(`${this.url}friendrequest/${receiverId}`)
  }

  //method to accept friend request
  acceptRequest(receiverId,senderId, data): Observable<any> {
    const params = new HttpParams()
      .set('status', data.status)
    return this.http.post(`${this.url}acceptrequest/${receiverId}/${senderId}`, params)
  }

  //method to delete a friend request
  deleteFriendRequest(senderId): Observable<any> {
    let data
    return this.http.post(`${this.url}deleterequest/${senderId}`, data)
  }

//method to logout
public logout(data):Observable<any>{
  const params=new HttpParams()
  .set('userId',data.userId)
  return this.http.post(`${this.url}logout`,params)
}
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
