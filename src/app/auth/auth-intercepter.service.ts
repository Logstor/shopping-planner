import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { AuthState } from './store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor
{
  constructor(
    private readonly auth: AuthService,
    private readonly store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState: AuthState) => {
          return authState.user;
        }),
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
