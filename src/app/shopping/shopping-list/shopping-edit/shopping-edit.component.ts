import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/Ingredient';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import { shoppingListSelectors } from '../../store/shopping-list.selectors';
import { filter, withLatestFrom } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
  @ViewChild('f', { static: false })
  slForm: NgForm;

  public editMode: boolean = false;
  private readonly editedIngredientIndex$ = this.store.select(
    shoppingListSelectors.selectEditedIngredientIndex
  );
  private subscription: Subscription;
  private editItem: Ingredient;

  constructor(private readonly store: Store) { }

  ngOnInit(): void 
  {
    this.subscription = this.editedIngredientIndex$.pipe(
      filter(index => { 
        if (index > -1) return true;
        else 
        {
          this.editMode = false;
          return false;
        } 
      }),
      withLatestFrom(this.store.select(shoppingListSelectors.selectEditedIngredient))
    )
    .subscribe((editItem: [number, Ingredient]) => {
        this.editMode = true;
        this.editItem = editItem[1];
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
    })
  }

  ngOnDestroy(): void 
  {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmitClick(form: NgForm): void
  {
    const value = form.value;
    const nIngredient = new Ingredient(value.name, value.amount);

    // Update if we're editing
    if (this.editMode)
    {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(nIngredient));
    }
    else
    {
      this.store.dispatch(new ShoppingListActions.AddIngredient(nIngredient))
    }

    // Clear the form
    form.reset();
    this.editMode = false;
  }

  onClear(): void
  {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void
  {
    if (this.editMode)
    {
      // this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient());      
      this.onClear();
    }
  }
}
