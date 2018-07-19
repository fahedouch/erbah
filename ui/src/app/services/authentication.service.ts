import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from "./data.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {MemoryService} from "./memory.service";
import {JwtHelper} from "./JwtHelper";

@Injectable()
export class AuthenticationService {
  private token: string;
  private CSRFtoken: string;
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

    return this.dataService.post('/api/authenticate', JSON.stringify({ pseudo: pseudo, password: password }),
      this.CSRFtoken)
      .map((response ) => {
        this.tokenModel = response;
        let token = this.tokenModel && this.tokenModel.jwt_token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify({ pseudo: pseudo, token: token }));

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

  /**
   * decode token in Session Storage
   */
  public decodeTokenInSessionStorage() : TokenType{
    var jwtHelper  = new JwtHelper();
    return jwtHelper.decodeToken(this.getTokenFromSessionStorage());
  }


  /**
   * get Token From Session Storage
   * @returns {string}
   */
  public getTokenFromSessionStorage() : string{
    return  JSON.parse(sessionStorage.getItem('currentUser')).token;
  }


  /**
   * get Pseudo From Session Storage
   * @returns {string}
   */
  public getPseudoFromSessionStorage() : string{
    return  JSON.parse(sessionStorage.getItem('currentUser')).pseudo;
  }


  public canActivate() {
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }
  }

}

interface TokenType {
  iss : string;
  user_id : number;
  user_role : string;
}

