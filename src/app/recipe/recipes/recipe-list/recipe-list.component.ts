import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.reducer';
import { RecipeState } from '../../store/recipes.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy
{
  recipeChangeSub: Subscription;
  recipes: Recipe[];

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void 
  {
    this.recipeChangeSub = this.store
      .select('recipes')
      .pipe(
        map( (recipeState: RecipeState) => recipeState.recipes )
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      ) 
  }

  ngOnDestroy(): void 
  {
    this.recipeChangeSub.unsubscribe();
  }
}
