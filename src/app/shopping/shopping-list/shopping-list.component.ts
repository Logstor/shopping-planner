import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-list.service';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as SLA from '../store/shopping-list.actions';

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
    private listService: ShoppingListService, 
    private readonly store: Store<fromShoppingList.AppState>
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
