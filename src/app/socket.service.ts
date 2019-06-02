import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';

import { tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";


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


  //events to be emitted

  public setUser = (authToken) => {
    this.socket.emit('set-user', (authToken))
  } //end setUser


}
