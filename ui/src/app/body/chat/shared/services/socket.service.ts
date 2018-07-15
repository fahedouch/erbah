import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../../../models/message';
import { Event } from '../../../../models/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:9003/';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);

  }

  /**
   *
   * @param {Message} messaged
   * @param {String} pseudo
   */
  public sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }

  /**
   * send User pseudo to server
   * @param {string} userPseudo
   */
  public  sendUserPseudoToLogin(userPseudo : string): void{
    this.socket.emit('login', userPseudo);
  }

  public  sendUserPseudoToLogout(userPseudo : string): void{
    this.socket.emit('logout', userPseudo);
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
