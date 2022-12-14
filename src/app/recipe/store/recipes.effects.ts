import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";

import * as RA from 'src/app/recipe/store/recipes.actions';
import * as HeaderActions from "src/app/header/store/header.actions";
import * as AuthActions from "src/app/auth/store/auth.actions";
import { AppState } from "src/app/store/app.reducer";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class RecipeEffects
{
    storeRecipes$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(RA.STORE_RECIPES, HeaderActions.saveRequest),
                concatLatestFrom(() => this.store.select('recipes')),
                switchMap( ([action, recipesState]) => {
                    return this.http
                        .put(
                            'https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                            recipesState.recipes
                        );
                })
            )
    }, { dispatch: false });

    fetchRecipes$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(RA.FETCH_RECIPES, AuthActions.AUTHENTICATE_SUCCESS),
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
        private readonly store: Store<AppState>
    ) {}
}