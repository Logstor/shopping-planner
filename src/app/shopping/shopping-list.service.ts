import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/Ingredient";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromShoppingList from "./store/shopping-list.reducer";

@Injectable({providedIn: 'root'})
export class ShoppingListService
{
    private ingredients: Ingredient[] = [];

    public readonly ingredientsChanged: Subject<Ingredient[]> = new Subject();
    public readonly startedEditing: Subject<number> = new Subject<number>()

    constructor(private readonly store: Store<fromShoppingList.AppState>) {}

    public get ingredientList()
    {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient): void
    {
        this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));

        // this.ingredients.push(ingredient);
        // this.ingredientsChanged.next(this.ingredientList);
    }

    public addIngredients(nIngredients: Ingredient[])
    {
        this.store.dispatch(new ShoppingListActions.AddIngredients(nIngredients));

        // this.ingredients.push(... nIngredients);
        // this.ingredientsChanged.next(this.ingredientList);
    }

    public getIngredient(index: number): Ingredient
    {
        return this.ingredients[index];
    }

    public updateIngredient(index: number, nIngredient: Ingredient): void
    {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: index, ingredient: nIngredient }));

        // this.ingredients[index] = nIngredient;
        // this.ingredientsChanged.next(this.ingredientList);
    }

    public deleteIngredient(index: number): Ingredient
    {
        const deleted: Ingredient = this.ingredients.splice(index, 1)[0];
        this.ingredientsChanged.next(this.ingredientList);
        return deleted;
    }
}