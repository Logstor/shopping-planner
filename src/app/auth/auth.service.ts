import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as AuthAction from 'src/app/auth/store/auth.actions';

/**
 * Response interface for signin and signup requests.
 */
export interface AuthResponseData
{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  /** Only for signin */
  registered?: boolean;
}

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
