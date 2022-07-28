import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/Ingredient';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
  @ViewChild('f', { static: false })
  slForm: NgForm;

  private subscription: Subscription;
  public editMode: boolean = false;
  private editItem: Ingredient;

  constructor(private readonly store: Store<fromApp.AppState>) { }

  ngOnInit(): void 
  {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1)
      {
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
      else
      {
        this.editMode = false;
      }
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

      // this.shoppingListService.updateIngredient(this.editedItemIndex, nIngredient);
    }
    else
    {
      this.store.dispatch(new ShoppingListActions.AddIngredient(nIngredient))

      // this.shoppingListService.addIngredient(nIngredient);
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
