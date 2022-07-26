import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor
{
  constructor(private readonly auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    return this.auth.user
      .pipe(
        take(1), 
        exhaustMap(user => {
          if (!user) { return next.handle(req); }

          // Edit request
          const modifiedRequest = req.clone({
            params: new HttpParams().set('auth', user.token)
          });

          return next.handle(modifiedRequest);
        })
    );
  }
}
