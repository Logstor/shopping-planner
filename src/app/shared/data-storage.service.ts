import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipes/recipe.model';
import { SetRecipes } from '../recipe/store/recipes.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService 
{
  private isFetching: boolean = false;

  constructor(
    private readonly http: HttpClient, 
    private readonly recipeService: RecipeService,
    private readonly store: Store<AppState>
  ) { }

  storeRecipes(): void
  {
    // Retrieve the recipes
    const recipes = this.recipeService.recipeList;

    // Store
    this.http
      .put(
        'https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes()
  {
    return this.http
      .get<Recipe[]>(
        'https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ... recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new SetRecipes(recipes));
        })
      );
  }
}
