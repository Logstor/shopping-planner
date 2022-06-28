import { Component } from '@angular/core';
import { HeaderState } from './header/HeaderState';
import { RecipeService } from './recipe/recipe.service';
import { ShoppingListService } from './shopping/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService]
})
export class AppComponent
{
  headerState: HeaderState = HeaderState.Recipe;
  readonly HeaderStateType = HeaderState;

  onHeaderStateChange(nState: HeaderState)
  {
    this.headerState = nState;
  }
}
