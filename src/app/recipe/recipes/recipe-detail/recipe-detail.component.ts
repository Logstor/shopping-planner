import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping/shopping-list.service';
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
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private slService: ShoppingListService
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

  onEditClick(): void
  {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

  addToShoppingList(): void
  {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
