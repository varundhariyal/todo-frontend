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
    
  }

  //events to be listened

  public verifyUser = (): Observable<any> => {
    // connection is being created.
    //handshake
    this.socket = io(this.url)
    // this.socket.removeAllListeners(['verifyUser']);

    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data)
      }) //end socket
    }) //end observerable
  } //end verifyUser method


  //socket for friend request sent notification
  public friendNotification = (userId) => {
    // this.socket.removeAllListeners([userId]);

    return Observable.create((observer) => {
      this.socket.on(userId, (notification) => {
        observer.next(notification);
      }); //end Socket
    }); //end Observable
  }

  //socket for friend request accepted notification
  public friendAcceptNotification = (userId) => {
    // this.socket.removeAllListeners(['fRAccept'+userId])
    return Observable.create((observer) => {
      this.socket.on('fRAccept'+userId, (notification) => {
        observer.next(notification)
      })
    })
  }

  //socket for friend request accepted notification
  public multiToDoCreate = (userId) => {
    // this.socket.removeAllListeners(['create'+userId]);
    return Observable.create((observer) => {
      this.socket.on('create' + userId, (notification) => {
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

  public sendFriendAcceptInfo = (receiverInfo: any) => {
    console.log(receiverInfo)
    this.socket.emit('accept-request', (receiverInfo))
  }

  public sendMultiTodoInfo = (data) => {
    this.socket.emit('multi-todo-create', (data))
  }


  public disconnectSocket = () => {
    this.socket.emit('logout')
  }


}
