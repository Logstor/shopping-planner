import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';
import { AuthService } from './auth.service';
import { AuthState } from './store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{
  constructor(
    private readonly auth: AuthService, 
    private readonly router: Router,
    private readonly store: Store<AppState>  
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: AuthState) => { return authState.user; }),
      map(user => {
        const isAuth: boolean = !!user;
        if (isAuth)
        {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    ); 
  }
}
