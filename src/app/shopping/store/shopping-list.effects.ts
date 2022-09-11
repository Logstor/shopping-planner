import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Ingredient } from "src/app/shared/Ingredient";
import * as ShoppingListActions from "src/app/shopping/store/shopping-list.actions";
import { AppState } from "src/app/store/app.reducer";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListEffects
{
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly http: HttpClient
    ) {}

    storeShoppingList$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ShoppingListActions.STORE_INGREDIENTS),
                concatLatestFrom(() => this.store.select('shoppingList')),
                switchMap(([action, shoppingListState]) => this.http.put(
                    "https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/shopping-list.json",
                    shoppingListState.ingredients
                ))
            )
    }, { dispatch: false });

    fetchShoppingList$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ShoppingListActions.FETCH_INGREDIENTS),
                switchMap(() => this.http.get<Ingredient[]>(
                    "https://shoppingplanner-8923c-default-rtdb.europe-west1.firebasedatabase.app/shopping-list.json"
                )),
                map((ingredients: Ingredient[]) => new ShoppingListActions.SetIngredients(ingredients))
            )
    });
}