import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SignInRequest } from './sign-in-request.model';
import { SignUpRequest } from './sign-up-request.model';
import { User } from './user.model';

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
  readonly user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  signUp(email: string, password: string)
  {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLEA8KuOMrUfmFJu3uwna9rix-vAPNA44',
        new SignUpRequest(
          email,
          password,
          true
        )
      )
      .pipe(
        catchError(this.handleError), 
        tap(resData => { this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); })
      );
  }

  login(email: string, password: string)
  {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLEA8KuOMrUfmFJu3uwna9rix-vAPNA44',
        new SignInRequest(
          email,
          password,
          true
        )
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => { this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); })
      )
  }

  autoLogin(): void
  {
    // Get the userdata from the LocalStorage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('userData'));

    // Check
    if (!userData) { return; }

    const loadedUser: User = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiration)
    );

    // Check if the token is valid
    if (loadedUser.token)
    {
      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void
  {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) 
    { 
      clearTimeout(this.tokenExpirationTimer); 
      this.tokenExpirationTimer = null; 
    }
  }

  /**
   * 
   * @param expirationDuration Amount of milliseconds before logout.
   */
  autoLogout(expirationDuration: number): void
  {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
  {
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    // Store token
    try 
    {
      localStorage.setItem('userData', JSON.stringify(user));
    } 
    catch (error) 
    {
      console.log(error);
    }

    this.autoLogout(expiresIn * 1000);

    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse)
  {
    let errorMsg: string = 'An unknown error occurred!';

    // Check error object
    if (!errorResponse.error || !errorResponse.error.error)
    {
      return throwError(errorMsg);
    }

    switch (errorResponse.error.error.message)
    {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email doesn\'t exist!'
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct!'
        break;
    }
    return throwError(errorMsg);
  }
}
