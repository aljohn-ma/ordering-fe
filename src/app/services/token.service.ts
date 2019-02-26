import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token_name = 'token';
  private src = new BehaviorSubject({});
  token = this.src.asObservable();

  constructor() {
    this.src.next(this.get());
  }

  private set(name, value) {
    localStorage.setItem(name, value);
  }

  handle(token) {
    this.set('axs', btoa(JSON.stringify(token['access'])));
    this.set(this.token_name, token['access_token']);
    this.src.next(this.get());
  }

  get() {
    return localStorage.getItem(this.token_name);
  }

  remove() {
    localStorage.clear();
    this.src.next(null);
  }

  is_valid(token = '') {
    if (token) {
      return this.get() === token;
    }
    return this.get() !== null;
  }


}
