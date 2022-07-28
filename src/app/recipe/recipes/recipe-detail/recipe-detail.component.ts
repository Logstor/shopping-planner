import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as SLA from 'src/app/shopping/store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { RecipeService } from '../../recipe.service';
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
    private readonly recipeService: RecipeService,
    private readonly store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void 
  {
    // Set initial Recipe
    // this.recipe = this.recipeService.getById(+this.route.snapshot.params['id']);

    // Subscribe to changes
    this.route.params.subscribe(
      (params: Params) => { 
        this.id = +params['id'];
        this.recipe = this.recipeService.getById(this.id); 
      }
    );
  }

  onEdit(): void
  {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

  onDelete(): void 
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate([`/recipes`]);
  }

  addToShoppingList(): void
  {
    this.store.dispatch(new SLA.AddIngredients(this.recipe.ingredients));

    // this.slService.addIngredients(this.recipe.ingredients);
  }
}
