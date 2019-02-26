import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { plainToClass } from 'class-transformer';
import { LoginStatusService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private helper = new JwtHelperService();

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private login_status: LoginStatusService

  ) { }

  authenticate() {
    if (!this.tokenService.is_valid()) {
      this.tokenService.remove();
      this.router.navigate(['/login']);
    }
  }

}
