import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as AuthAction from 'src/app/auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private tokenExpirationTimer: any;

  constructor(
    private readonly store: Store<AppState>
  ) { }

  /**
   * 
   * @param expirationDuration Amount of milliseconds before logout.
   */
  setLogoutTimer(expirationDuration: number): void
  {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthAction.Logout());
    }, expirationDuration)
  }

  clearLogoutTimer()
  {
    if (this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
