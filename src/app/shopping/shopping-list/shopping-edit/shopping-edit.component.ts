import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit 
{
  @ViewChild("nameInput", { static: false })
  private name: ElementRef;
  @ViewChild("amountInput", { static: false })
  private amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  onSubmitClick(): void
  {
    this.shoppingListService.addIngredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value
    );
  }
}
