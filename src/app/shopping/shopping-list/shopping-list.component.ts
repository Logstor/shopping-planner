import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SLA from '../store/shopping-list.actions';
import { shoppingListSelectors } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
  public readonly ingredients$ = this.store.select(
    shoppingListSelectors.selectIngredientsSorted
  );

  constructor(
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onEditItem(index: number): void
  {
    this.store.dispatch(new SLA.StartEdit(index));
  }

  onRemoveItem(index: number): void
  {
    this.store.dispatch(new SLA.StartEdit(index));
    this.store.dispatch(new SLA.DeleteIngredient());
  }
}
