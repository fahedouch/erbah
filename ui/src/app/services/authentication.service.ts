import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from "./data.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {MemoryService} from "./memory.service";

@Injectable()
export class AuthenticationService {
  public token: string;
  public CSRFtoken: string;
  private tokenModel : any = {jwt_token:null};

  constructor(private http: HttpClient,
              private dataService : DataService,
              private memoryService : MemoryService) {

    // set token if saved in local storage
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }


  /**
   * login method
   * @param {string} pseudo
   * @param {string} password
   * @returns {Observable<boolean>}
   */
  login(pseudo: string, password: string): Observable<boolean> {

    this.memoryService.getCSRFtoken().subscribe(res => {
      this.CSRFtoken = res;
    });

    return this.dataService.post('/api/authenticate', JSON.stringify({ username: pseudo, password: password }),
      this.CSRFtoken)
      .map((response ) => {
        this.tokenModel = response;
        let token = this.tokenModel && this.tokenModel.jwt_token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify({ username: pseudo, token: token }));

          // return true to indicate successful login
          return true;

        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  /**
   * logout method
   */
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    sessionStorage.removeItem('currentUser');
  }
}
