import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Ingredient } from "src/app/shared/Ingredient";
import * as ShoppingListActions from "src/app/shopping/store/shopping-list.actions";
import * as HeaderActions from "src/app/header/store/header.actions";
import * as AuthActions from "src/app/auth/store/auth.actions";
import { shoppingListFeature } from "./shopping-list.reducer";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListEffects
{
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly http: HttpClient
    ) {}

    storeShoppingList$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ShoppingListActions.STORE_INGREDIENTS, HeaderActions.saveRequest),
                concatLatestFrom(() => this.store.select(shoppingListFeature.selectIngredients)),
                switchMap(([action, ingredients]) => this.http.put(
                    "https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/shopping-list.json",
                    ingredients
                ))
            )
    }, { dispatch: false });

    fetchShoppingList$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ShoppingListActions.FETCH_INGREDIENTS, AuthActions.AUTHENTICATE_SUCCESS),
                switchMap(() => this.http.get<Ingredient[]>(
                    "https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/shopping-list.json"
                )),
                map((ingredients: Ingredient[]) => { 
                    const safeIngredients: Ingredient[] = ingredients ? ingredients : [];
                    return new ShoppingListActions.SetIngredients(safeIngredients);
                })
            )
    });
}
