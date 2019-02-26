import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  private src = new BehaviorSubject({});
  currentStatus = this.src.asObservable();

  constructor() { }

  changeStatus(new_value: {}) {
    this.src.next(new_value);
  }
}
