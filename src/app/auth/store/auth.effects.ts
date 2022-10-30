import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import * as AuthAction from 'src/app/auth/store/auth.actions';
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { SignInRequest } from "../sign-in-request.model";
import { SignUpRequest } from "../sign-up-request.model";
import { User } from "../user.model";

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

@Injectable()
export class AuthEffects 
{
    private readonly signupUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ environment.firebaseAPIKey }`;
    private readonly loginUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.firebaseAPIKey }`;

    @Effect()
    authLogin$ = this.actions$
                    .pipe(
                        ofType(AuthAction.LOGIN_START),
                        switchMap((authData: AuthAction.LoginStart) => {
                            return this.http
                                .post<AuthResponseData>(
                                    this.loginUrl,
                                    new SignInRequest(
                                        authData.payload.email,
                                        authData.payload.password,
                                        true
                                    )
                                )
                                .pipe(
                                    map(resData => {
                                        return this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                                    }),
                                    catchError((errorResponse: HttpErrorResponse) => {
                                        return this.handleError(errorResponse);
                                    })
                                )
                            }
                        )
                    );

    @Effect()
    authSignup$ = this.actions$
                        .pipe(
                            ofType(AuthAction.SIGNUP_START),
                            switchMap((signupAction: AuthAction.SignupStart) => {
                                return this.http
                                    .post<AuthResponseData>(
                                        this.signupUrl,
                                        new SignUpRequest(
                                            signupAction.payload.email,
                                            signupAction.payload.password,
                                            true
                                        )
                                    )
                                    .pipe(
                                        map(resData => {
                                            return this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                                        }),
                                        catchError((errorResponse: HttpErrorResponse) => {
                                            return this.handleError(errorResponse);
                                        })
                                    );
                            })
                        );

    @Effect({ dispatch: false })
    authRedirect$ = this.actions$
                        .pipe(
                            ofType(AuthAction.AUTHENTICATE_SUCCESS),
                            tap( (authSuccessAction: AuthAction.AuthenticateSuccess) => {
                                if (authSuccessAction.payload.redirect)
                                    // Navigate
                                    this.router.navigate(['/']);
                            })
                        );

    authLogout$ = createEffect(
        () => this.actions$
                .pipe(
                    ofType(AuthAction.LOGOUT),
                    tap(() => {
                        this.auth.clearLogoutTimer();
                        localStorage.removeItem('userData');
                        this.router.navigate(['/auth']);
                    })
                ),
        { dispatch: false }
    )

    autoLogin$ = createEffect(
        () => this.actions$
                .pipe(
                    ofType(AuthAction.AUTO_LOGIN),
                    map(() => {
                        // Get the userdata from the LocalStorage
                        const userData: {
                            email: string;
                            id: string;
                            _token: string;
                            _tokenExpiration: string;
                        } = JSON.parse(localStorage.getItem('userData'));
                    
                        // Check
                        if (!userData) { return { type: 'DUMMY' }; }
                    
                        // Check if the token is valid
                        if (userData._token)
                        {
                            // this.user.next(loadedUser);
                            const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();

                            // Check if the token isn't too old
                            if (expirationDuration < 1)
                            {
                                return { type: 'DUMMY' };
                            }
                            else
                            {
                                this.auth.setLogoutTimer(expirationDuration);
                                return new AuthAction.AuthenticateSuccess({
                                    email: userData.email,
                                    userId: userData.id,
                                    token: userData._token,
                                    expirationDate: new Date(userData._tokenExpiration),
                                    redirect: false
                                });
                            }
                        }

                        return { type: 'DUMMY' };
                    })
                )
    )

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly auth: AuthService
    ) {}

    /**
     * Handles the last part of the authentication process, where the we have 
     * gotten a positive response from the server.
     * 
     * @param email The authenticated user E-mail.
     * @param userId The authenticated user ID.
     * @param token The token from the authenticated response.
     * @param expiresIn Seconds before the token expires.
     * @returns An AuthAction.
     */
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): AuthAction.AuthAction
    {
        const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );

        try { localStorage.setItem('userData', JSON.stringify(user)); }
        catch (error) { console.log(error); }

        this.auth.setLogoutTimer(expiresIn * 1000);

        return new AuthAction.AuthenticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
            redirect: true
        });
    }

    private handleError(errorResponse: HttpErrorResponse): Observable<AuthAction.AuthAction>
    {
        let errorMsg: string = 'An unknown error occurred!';

        // Check error object
        if (!errorResponse.error || !errorResponse.error.error)
        {
            return of(new AuthAction.AuthenticateFail(errorMsg));
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
        return of(
            new AuthAction.AuthenticateFail(errorMsg)
        );
    }
}