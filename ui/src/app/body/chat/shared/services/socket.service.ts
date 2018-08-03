import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../../../models/message';
import { Event } from '../../../../models/event';

import * as socketIo from 'socket.io-client';
import {AuthenticationService} from "../../../../services";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../../../services/data.service";
import {MemoryService} from "../../../../services/memory.service";

const SERVER_URL = 'http://localhost:9003/';

@Injectable()
export class SocketService {

  private socket;
  private authenticationService = new AuthenticationService();
  private dataToSocketServer =  {dataContent : null, token : null};


  constructor() {
  }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  /**
   *
   * @param {Message} messaged
   * @param {String} pseudo
   * @param {String} token
   */
  public sendMessage(message: Message): void {
   this.initDataToSocketServer(message);
    this.socket.emit('message', this.dataToSocketServer);
  }

  /**
   * send User pseudo to server
   * @param {string} userPseudo
   * @param {String} token
   */
  public  sendUserPseudoToLogin(userPseudo : string): void{
    this.initDataToSocketServer(userPseudo);
    this.socket.emit('login', this.dataToSocketServer);
  }

  /**
   * send User Pseudo in order to make logout action
   * @param {string} userPseudo
   */
  public  sendUserPseudoToLogout(userPseudo : string): void{
    this.initDataToSocketServer(userPseudo);
    this.socket.emit('logout', this.dataToSocketServer);
  }

  public initDataToSocketServer(value: string | Message ) : void{
    this.dataToSocketServer.dataContent = value;
    this.dataToSocketServer.token = this.authenticationService.getTokenFromSessionStorage();
  }

  /**
   * on Message
   * @returns {Observable<Message>}
   */
  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  /**
   * on user Pseudo
   * @returns {Observable<string>}
   */
  public onUserPseudoToLogin(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('login', (data: string) => observer.next(data));
    });
  }

  /**
   * on user Pseudo
   * @returns {Observable<string>}
   */
  public onUserPseudoToLogout(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('logout', (data: string) => observer.next(data));
    });
  }

  /**
   * on Event
   * @param {Event} event
   * @returns {Observable<any>}
   */
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
