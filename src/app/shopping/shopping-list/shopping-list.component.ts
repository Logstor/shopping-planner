import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/logging.service';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
  public ingredients: Ingredient[];
  private ingredientSub: Subscription;

  constructor(private listService: ShoppingListService, private readonly log: LoggingService) { }

  ngOnInit(): void 
  {
    this.ingredients = this.listService.ingredientList;
    this.ingredientSub = this.listService.ingredientsChanged
      .subscribe(
        (nIngredientList: Ingredient[]) => {
          this.ingredients = nIngredientList;
        }
      );

    this.log.printLog('Hello from Shopping List Component ngOnInit');
  }

  ngOnDestroy(): void 
  {
    this.ingredientSub.unsubscribe();  
  }

  onEditItem(index: number): void
  {
    this.listService.startedEditing.next(index);
  }
}
