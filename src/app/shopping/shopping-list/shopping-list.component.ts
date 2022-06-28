import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit
{
  public ingredients: Ingredient[];

  constructor(private listService: ShoppingListService) { }

  ngOnInit(): void 
  {
    this.ingredients = this.listService.ingredientList;
    this.listService.ingredientsChanged.subscribe(
      (nIngredientList: Ingredient[]) => {
        this.ingredients = nIngredientList;
      }
    )
  }
}
