import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { shoppingListSelectors } from '../store/shopping-list.selectors';
import { shoppingListActions } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
  @Input('shoppingListId')
  public listId: string;

  @Input('isSharedShoppingList')
  public isShared: boolean;

  public readonly ingredients$ = combineLatest([
    this.store.select(shoppingListSelectors.selectShoppingLists),
    this.store.select(shoppingListSelectors.selectSharedShoppingLists)
  ]).pipe(
    map(([shoppingLists, sharedShoppingLists]) => {
      //TODO: Update this part to make use of the isShared flag
      const shoppingList = shoppingLists.find(list => list.id === this.listId);
      if (shoppingList)
        return shoppingList;
      else
      {
        const sharedShoppingList = sharedShoppingLists.find(list => list.id === this.listId);
        if (sharedShoppingList)
          return sharedShoppingList;
        else
          return null;
      }
    }),
    filter(shoppingList => {
      // Guard against null
      if (!shoppingList) return false;

      // If it's the first call
      if (!this.currentStringify)
      {
        this.currentStringify = JSON.stringify(shoppingList);
        return true
      }
      
      // If the list has changed
      if (this.currentStringify !== JSON.stringify(shoppingList))
      {
        this.currentStringify = JSON.stringify(shoppingList);
        return true
      }

      // If we reach this point, the list has not changed
      return false;
    })
  );

  private currentStringify?: string = null

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onEditItem(index: number): void
  {
    this.store.dispatch(
      shoppingListActions.startEdit({
        ingredientIndex: index,
        listId: this.listId,
        isShared: this.isShared
      })
    );
  }

  onRemoveItem(ingredientName: string): void
  {
    this.store.dispatch(shoppingListActions.componentRemoveIngredient({
      listId: this.listId,
      ingredientName: ingredientName
    }))
  }
}
