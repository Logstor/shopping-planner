import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { RecipeService } from '../../recipe.service';
import { RecipeState } from '../../store/recipes.reducer';
import { Recipe } from '../recipe.model';
import * as RA from 'src/app/recipe/store/recipes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy
{
  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  public get ingredientControls()
  {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly router: Router, 
    private readonly recipeService: RecipeService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void 
  {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  ngOnDestroy(): void 
  {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit(): void
  {
    if (this.editMode)
      this.store.dispatch(new RA.UpdateRecipe({
        index: this.id,
        recipe: this.recipeForm.value
      }))
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else
      this.store.dispatch(new RA.AddRecipe({ recipe: this.recipeForm.value }))
      // this.recipeService.addRecipe(this.recipeForm.value);

    // Navigate out of edit
    this.navigateOut();
  }

  onCancel(): void 
  {
    this.navigateOut();
  }

  onAddIngredient(): void
  {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number): void
  {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private navigateOut(): void
  {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm()
  {
    let name: string = '';
    let imagePath: string = '';
    let description: string = '';
    let recipeIngredients: FormArray = new FormArray([]);
    if (this.editMode)
    {
      this.storeSub = this.store.select('recipes')
        .pipe(
          map( (recipeState: RecipeState) => {
            return recipeState.recipes.find( (recipe, index) => {
              return index === this.id;
            })
          })
        )
        .subscribe( (recipe: Recipe) => {
          // Set the recipe
          this.recipe = recipe;
          name = this.recipe.name;
          imagePath = this.recipe.imagePath;
          description = this.recipe.description;

          if (!this.recipe.ingredients) { return; }

          // Make ingredient list
          for (let ingredient of this.recipe.ingredients)
          {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        })
      }

      // Fill the form
      this.recipeForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'imagePath': new FormControl(imagePath, Validators.required),
        'description': new FormControl(description, Validators.required),
        'ingredients': recipeIngredients
      });
  }
}
