import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AppState } from 'src/app/store/app.reducer';
import { AuthResponseData, AuthService } from '../auth.service';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { AuthState } from '../store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy
{
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  isModeLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private readonly auth: AuthService, 
    private readonly router: Router,
    private readonly cmpFactory: ComponentFactoryResolver,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void 
  {
    this.storeSub = this.store.select('auth')
      .subscribe((authState: AuthState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  ngOnDestroy(): void 
  {
    if (this.closeSub) this.closeSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSwitchMode(): void 
  {
    this.isModeLogin = !this.isModeLogin;
  }

  onSubmit(form: NgForm): void
  {
    if (!form.valid)
    {
      return;
    }

    // Retrieve from form
    const email: string = form.value.email;
    const password: string = form.value.password;

    if (this.isModeLogin)
    {
      this.store.dispatch(new AuthActions.LoginStart({
        email: email,
        password: password
      }));
    }
    else
    {
      this.store.dispatch(new AuthActions.SignupStart({
        email: email,
        password: password
      }));
    }

    form.reset();
  }

  onHandleError(): void
  {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
