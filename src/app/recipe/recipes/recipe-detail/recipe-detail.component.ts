import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import * as SLA from 'src/app/shopping/store/shopping-list.actions';
import * as RA from 'src/app/recipe/store/recipes.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { RecipeState } from '../../store/recipes.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit 
{
  recipe: Recipe;
  id: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void 
  {
    // Subscribe to changes
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map( (recipeState: RecipeState) => {
          return recipeState.recipes.find( (recipe: Recipe, index: number) => {
            return index === this.id;
          });
        })
      )
      .subscribe( (recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onEdit(): void
  {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

  onDelete(): void 
  {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RA.DeleteRecipe(this.id));
    this.router.navigate([`/recipes`]);
  }

  addToShoppingList(): void
  {
    this.store.dispatch(new SLA.MergeIngredients(this.recipe.ingredients));
  }
}
