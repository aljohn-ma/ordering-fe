import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartInfoService {

  private src = new BehaviorSubject({});
  object = this.src.asObservable();

  constructor() { }

  applyCartChanges(data: any) {
    localStorage.setItem('cart', btoa(JSON.stringify(data)));



    if (localStorage.key['cart']) { data = JSON.parse(atob(localStorage.getItem('cart'))); }

    this.src.next(data);
  }
}
