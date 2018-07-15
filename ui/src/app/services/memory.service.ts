import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {SocketService} from "../body/chat/shared/services/socket.service";

@Injectable()
export class MemoryService {

  private CSRFtoken = new BehaviorSubject<string>('token');

  private JWTtoken = new BehaviorSubject<string>('token');

  public  socketService = new SocketService() ;

  constructor() {
    this.socketService.initSocket();
  }

  /**
   * get CSRF token Subject
   * @returns {BehaviorSubject<string>}
   */
  public getCSRFtoken(): BehaviorSubject<string> {
    return this.CSRFtoken;
  }

  /**
   * get CSRF token Subject
   * @returns {BehaviorSubject<string>}
   */
  public getJWTtoken(): BehaviorSubject<string> {
    return this.JWTtoken;
  }


}
