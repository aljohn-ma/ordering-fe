import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private HEADERS = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  constructor(
    private http: HttpClient,
    private token: TokenService,
  ) {
    token.token.subscribe(
      val => {
        this.HEADERS = new HttpHeaders().set('Authorization', 'Bearer ' + val);
      }
    );
  }

  post(url, data, options: any = {}) {
    return this.http.post(url, data, { headers: this.HEADERS, ...options });
  }

  get(url, id, options: any = {}) {
    return this.http.get(`${url}/${id}`, { headers: this.HEADERS, ...options });
  }

  get_list(url, options: any = {}) {
    return this.http.get(url, { headers: this.HEADERS, ...options });
  }

  put(url, id, data, options: any = {}) {
    return this.http.put(`${url}/${id}`, data, { headers: this.HEADERS, ...options });
  }

  delete(url, id, options: any = {}) {
    return this.http.delete(`${url}/${id}`, { headers: this.HEADERS, ...options });
  }

}
