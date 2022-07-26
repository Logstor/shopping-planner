import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../../shopping-list.service';

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
  private editedItemIndex: number;
  private editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void 
  {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
    });
  }

  ngOnDestroy(): void 
  {
    this.subscription.unsubscribe();
  }

  onSubmitClick(form: NgForm): void
  {
    const value = form.value;
    const nIngredient = new Ingredient(value.name, value.amount);

    // Update if we're editing
    if (this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemIndex, nIngredient);
    else
      this.shoppingListService.addIngredient(nIngredient);

    // Clear the form
    form.reset();
    this.editMode = false;
  }

  onClear(): void
  {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void
  {
    if (this.editMode)
    {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }
}
