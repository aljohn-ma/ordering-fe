import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class GrantPageAccessService implements CanActivate {

  constructor(
    private router: Router,
    private http: ApiService,
    private auth: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const arr = state.url.split('/');
    // const granted = this.auth.hasPageAccess(arr[1]) || this.auth.hasPageAccess(arr[arr.length - 1]);
    const granted = false;

    if (!granted) { this.router.navigate(['/401']); }

    return granted;
  }
}
