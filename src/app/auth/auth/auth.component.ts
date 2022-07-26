import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';

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

  constructor(
    private readonly auth: AuthService, 
    private readonly router: Router,
    private readonly cmpFactory: ComponentFactoryResolver
  ) { }

  ngOnInit(): void 
  {}

  ngOnDestroy(): void 
  {
    if (this.closeSub) this.closeSub.unsubscribe();
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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isModeLogin)
    {
      authObs = this.auth.login(email, password);
    }
    else
    {
      authObs = this.auth.signUp(email, password);
    }

    // Subscribe to the Observable and handle the response
    authObs.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMsg => {
        console.log(errorMsg)
        this.error = errorMsg;
        // this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError(): void
  {
    this.error = null;
  }

  // private showErrorAlert(msg: string): void
  // {
  //   const alertComponentFactory = this.cmpFactory.resolveComponentFactory(AlertComponent);

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const cmpRef = hostViewContainerRef.createComponent(alertComponentFactory);
  //   cmpRef.instance.message = msg;
  //   this.closeSub = cmpRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }
}
