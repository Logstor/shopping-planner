import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit 
{
  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  public get ingredientControls()
  {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void 
  {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.recipe = this.recipeService.getById(this.id);
        this.initForm();
      }
    )
  }

  onSubmit(): void
  {
    // const newRecipe: Recipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);

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
    let recipeIngredients: FormArray = new FormArray([]);
    if (this.editMode && this.recipe['ingredients'])
    {
      for (let ingredient of this.recipe.ingredients)
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.editMode ? this.recipe.name : '', Validators.required),
      'imagePath': new FormControl(this.editMode ? this.recipe.imagePath : '', Validators.required),
      'description': new FormControl(this.editMode ? this.recipe.description : '', Validators.required),
      'ingredients': recipeIngredients
    });
  }
}
