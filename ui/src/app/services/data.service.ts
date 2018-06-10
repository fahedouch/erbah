import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  /**
   * request option
   * @param {Map<string, string>} headerMap
   * @returns {any}
   */
  options(headerMap?: Map<string, string>): any {


      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

    if (headerMap) {
      for (let [ key, value ] of Array.from(headerMap.entries())) {
        headers.append(key, value);
      }
    }
    return headers;
  }

  /**
   * get header token
   * @param token
   * @returns {any}
   */
  getHeaderToken(token): any {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json').append('X-CSRF-TOKEN', token );
    return headers;
  }

  /**
   * Send a simple POST query to the back.
   *
   * @param url : String which contains the url to call
   * @param body : data to send to the backend.
   *
   * @return : an Observable instance which is performing the request.
   */
  post(url, body, CSRFtoken, responseType?): Observable<any> {
    var option : any = {
      responseType: (responseType != null) ? responseType : 'json',
      headers:  this.getHeaderToken(CSRFtoken)
    };
    return this.http.post(url, body, option);
  }


  /**
   * Send a simple GET query to the back.
   *
   * @param url : String which contains the url to call
   * @param params : data to send to the backend.
   *
   * @return : an Observable instance which is performing the request.
   */
  get(url: string, params?: any, headerMap?: Map<string, string>,responseType?): Observable<any> {

    if (params) {
      url += '?' + params;
    }
    var option : any = {
      responseType: (responseType != null) ? responseType : 'json' ,
      headers:  this.options(headerMap)
    };

    return this.http.get(url, option);
  }

  /**
   * Get JWT token
   * @param {string} url
   * @returns {Observable<string>}
   */
  getJWTToken(url: string) {
    var headerMap = new Map<string, string>();
    return this.get(url,null, headerMap );
  }

  /**
   * Get CSRF token
   * @param {string} url
   * @returns {Observable<any>}
   */
  getCSRFToken(url: string){
    return this.get(url,null,null,'text');
  }

}
