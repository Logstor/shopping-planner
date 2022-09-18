import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as HA from 'src/app/header/store/header.actions';
import * as AA from '../auth/store/auth.actions';
import * as RA from 'src/app/recipe/store/recipes.actions';
import * as SLA from 'src/app/shopping/store/shopping-list.actions';
import { AuthState } from '../auth/store/auth.reducer';
import { AppState } from '../store/app.reducer';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
  navbarCollapsed: boolean = true;
  isAuthenticated: boolean = false;
  private subs: Subscription[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  ngOnInit(): void 
  {
    this.subs.push(
      this.store.select('auth')
        .subscribe((authState: AuthState) => {
          this.isAuthenticated = !!authState.user; // First check whether there's no user and second inverts that so if it isn't null it's true
        })
    );
  }

  ngOnDestroy(): void 
  {
    this.subs.forEach( sub => sub.unsubscribe() );   
  }

  onSaveData(): void
  {
    this.store.dispatch(HA.saveRequest());
    // const routeUrl: string = this.router.url;

    // if (routeUrl === '/recipes')
    // {
    //   this.subs.push(
    //     this.dialogService.confirm(`Overwrite all the Recipes with the current ones?`)
    //       .subscribe((isConfirm: boolean) => isConfirm ? this.store.dispatch(new RA.StoreRecipes()) : console.log("Save cancelled"))
    //   );
    // }
    // else if (routeUrl === '/shopping-list')
    // {
    //   this.subs.push(
    //     this.dialogService.confirm(`Overwrite all ingredients with the current ones?`)
    //       .subscribe((isConfirm: boolean) => isConfirm ? this.store.dispatch(new SLA.StoreIngredients()) : console.log("Save cancelled"))
    //   );
    // }
  }

  onFetchData(): void
  {
    this.store.dispatch(new RA.FetchRecipes());
    this.store.dispatch(new SLA.FetchIngredients());
  }

  onLogout(): void
  {
    this.store.dispatch(new AA.Logout());
  }
}
