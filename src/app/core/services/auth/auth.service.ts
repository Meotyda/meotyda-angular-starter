import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env';
import { AuthToken } from '@shared/models/auth';
import { Router } from '@angular/router';

const API = {
  LOGIN: '<login-url>',
  REFRESH: '<refresh_token_url>',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.storeToken({ access_token: 'access_token', refresh_token: 'refresh_token' });
  }

  logout() {
    localStorage.removeItem(environment.authToken);
    localStorage.removeItem(environment.refreshToken);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getToken(); // add your strong logic
  }

  storeToken(token: AuthToken) {
    localStorage.setItem(environment.authToken, token.access_token);
    localStorage.setItem(environment.refreshToken, token.refresh_token);
  }

  getToken() {
    return localStorage.getItem(environment.authToken);
  }

  refreshToken() {
    const body = new HttpParams().set(environment.refreshToken, this.getRefreshToken()!);

    return this.http.post<AuthToken>(API.REFRESH, body.toString(), {
      headers: this.headers,
    });
  }

  getRefreshToken() {
    return localStorage.getItem(environment.refreshToken);
  }
}
