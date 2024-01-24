import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";

import { ShoppingListService } from "src/app/shared/services/shopping-list/shopping-list.service";
import { shoppingListActions } from "./shopping-list.actions";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListEffects
{
    constructor(
        private readonly actions$: Actions,
        private readonly shoppingListService: ShoppingListService
    ) {}

    readonly addIngredient$ = createEffect(() => this.actions$
        .pipe(
            ofType(shoppingListActions.componentAddIngredient),
            switchMap(action => this.shoppingListService.addIngredient(action.listId, action.ingredient))
        ), 
    { dispatch: false});

    readonly deleteIngredient$ = createEffect(() => this.actions$
        .pipe(
            ofType(shoppingListActions.componentRemoveIngredient),
            switchMap(action => this.shoppingListService.deleteIngredient(action.listId, action.ingredientName))
        ),
    { dispatch: false });
}
