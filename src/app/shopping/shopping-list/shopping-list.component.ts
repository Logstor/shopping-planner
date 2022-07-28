import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from 'src/app/shared/Ingredient';
import * as SLA from '../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
  public ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private ingredientSub: Subscription;

  constructor(
    private readonly store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void 
  {
    this.ingredients = this.store.select('shoppingList')
  }

  ngOnDestroy(): void 
  {
    // this.ingredientSub.unsubscribe();  
  }

  onEditItem(index: number): void
  {
    this.store.dispatch(new SLA.StartEdit(index));
    // this.listService.startedEditing.next(index);
  }
}
