import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthToken } from '@shared/models/auth';
import { environment } from '@env';
import { AuthService } from './auth/auth.service';

@Injectable()
export class HTTPReqResInterceptor implements HttpInterceptor {
  isAlreadyRefreshing: boolean = false;

  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(@Inject('BASE_URL') private baseUrl: string, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: this.baseUrl + req.url,
      headers: req.headers.set(environment.authHeader, `Bearer ${this.authService.getToken()!}`),
    });

    return next.handle(newReq).pipe(
      tap((e) => {
        if (e instanceof HttpResponse) {
          this.handleSuccess(e.body);
        }
      }),
      catchError((err) => this.handleError(newReq, next, err))
    );
  }

  handleError(newRequest: HttpRequest<any>, next: HttpHandler, err: any): Observable<HttpEvent<any>> {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      return this.handle401(newRequest, next);
    }

    return throwError(err);
  }

  handleSuccess(body: any) {
    /* handle success actions here */
  }

  addToken(request: HttpRequest<any>, newToken: AuthToken) {
    return request.clone({
      headers: request.headers.set(environment.authHeader, `Bearer ${newToken.access_token}`),
    });
  }

  handle401(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isAlreadyRefreshing) {
      this.isAlreadyRefreshing = true;

      this.tokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((newToken: AuthToken) => {
          if (newToken) {
            this.authService.storeToken(newToken);
            this.tokenSubject.next(newToken);

            return next.handle(this.addToken(request, newToken));
          }

          this.authService.logout();
          return throwError('no refresh token found');
        }),
        catchError((error) => {
          this.authService.logout();
          return throwError(error);
        }),
        finalize(() => (this.isAlreadyRefreshing = false))
      );
    } else {
      if (this.isAlreadyRefreshing && request.url.includes('refresh')) {
        this.authService.logout();
      }

      return this.tokenSubject.pipe(
        filter((token: AuthToken) => token != null),
        take(1),
        switchMap((token: AuthToken) => next.handle(this.addToken(request, token)))
      );
    }
  }
}
