import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from "./data.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient,
              private dataService : DataService) {

    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(pseudo: string, password: string): Observable<boolean> {
    return this.dataService.post('/api/authenticate', JSON.stringify({ username: pseudo, password: password }))
      .map((response ) => {
        var decodedString = String.fromCharCode.apply(null, new Uint8Array(response));

        // login successful if there's a jwt token in the response
        let token = JSON.parse(decodedString) && JSON.parse(decodedString).token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: pseudo, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
