import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable, observable } from 'rxjs';

import { tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3306';

  private socket: any;

  constructor(private http: HttpClient) {
    // connection is being created.
    //handshake
    this.socket = io(this.url)
  }

  //events to be listened

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data)
      }) //end socket
    }) //end observerable
  } //end verifyUser method


  //socket for friend request sent notification
  public friendNotification = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (notification) => {
        observer.next(notification);
      }); //end Socket
    }); //end Observable
  }

 //socket for friend request accepted notification
 public friendAcceptNotification=(userId)=>{
   return Observable.create((observer)=>{
     this.socket.on(userId,(notification)=>{
       observer.next(notification)
     })
   })
 }


  //events to be emitted

  public setUser = (authToken) => {
    this.socket.emit('set-user', (authToken))
  } //end setUser

  public sendFriendReqeuestInfo = (senderInfo: any) => {
    console.log(senderInfo);
    this.socket.emit('friend-info', (senderInfo))
  }

  public sendFriendAcceptInfo=(receiverInfo:any)=>{
    console.log(receiverInfo)
    this.socket.emit('accept-request',(receiverInfo))
  }

}
