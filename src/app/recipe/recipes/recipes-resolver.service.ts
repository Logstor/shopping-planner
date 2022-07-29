import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { AppState } from "src/app/store/app.reducer";
import { Recipe } from "./recipe.model";
import * as RA from 'src/app/recipe/store/recipes.actions';
import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>
{
    constructor(
        private readonly store: Store<AppState>,
        private readonly actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> 
    {
        // const recipes = this.recipesService.recipeList;

        // if (recipes.length === 0)
        //     return this.dataStorage.fetchRecipes();
        // else
        //     return recipes;

        return this.store.select('recipes')
            .pipe(
                take(1),
                map(recipesState => {
                    return recipesState.recipes;
                }),
                switchMap(recipes => {
                    if (recipes.length === 0)
                    {
                        this.store.dispatch(new RA.FetchRecipes());
                        return this.actions$
                            .pipe(
                                ofType(RA.SET_RECIPES),
                                take(1)
                            );
                    }
                    else
                    {
                        return of(recipes);
                    }
                })
            )
    }
}