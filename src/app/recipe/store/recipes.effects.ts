import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import * as RA from 'src/app/recipe/store/recipes.actions';
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class RecipeEffects
{
    fetchRecipes$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(RA.FETCH_RECIPES),
                switchMap(() => {
                    return this.http
                        .get<Recipe[]>(
                            'https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
                        );
                }),
                map(recipes => {
                    return recipes.map(recipe => {
                      return {
                        ... recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                      };
                    });
                }),
                map( (recipes: Recipe[]) => {
                    return new RA.SetRecipes(recipes);
                })
            )
    })

    constructor(
        private readonly actions$: Actions,
        private readonly http: HttpClient,
    ) {}
}