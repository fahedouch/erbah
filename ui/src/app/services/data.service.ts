import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  options(): any {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return {headers: headers};
  }

  /**
   * Send a simple POST query to the back.
   *
   * @param url : String which contains the url to call
   * @param body : data to send to the backend.
   *
   * @return : an Observable instance which is performing the request.
   */
  post(url, body) {
    return this.http.post(url, body, this.options());
  }

  /**
   * Send a simple GET query to the back.
   *
   * @param url : String which contains the url to call
   * @param params : data to send to the backend.
   *
   * @return : an Observable instance which is performing the request.
   */
  get(url: string, params?: any): Observable<any> {
    if (params) {
      url += '?' + params;
    }
    return this.http.get<any>(url, this.options());
  }

}
