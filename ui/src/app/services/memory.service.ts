import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MemoryService {

  private CSRFtoken = new BehaviorSubject<string>('token');

  private JWTtoken = new BehaviorSubject<string>('token');


  constructor() { }

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
