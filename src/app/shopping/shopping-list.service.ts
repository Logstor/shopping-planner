import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient";

@Injectable({providedIn: 'root'})
export class ShoppingListService
{
    private ingredients: Ingredient[] = [
        new Ingredient("Hvidløg", 100),
        new Ingredient("Ingefær", 50)
    ];

    public readonly ingredientsChanged: Subject<Ingredient[]> = new Subject();
    public readonly startedEditing: Subject<number> = new Subject<number>()

    public get ingredientList()
    {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient): void
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredientList);
    }

    public addIngredients(nIngredients: Ingredient[])
    {
        this.ingredients.push(... nIngredients);
        this.ingredientsChanged.next(this.ingredientList);
    }

    public getIngredient(index: number): Ingredient
    {
        return this.ingredients[index];
    }

    public updateIngredient(index: number, nIngredient: Ingredient): void
    {
        this.ingredients[index] = nIngredient;
        this.ingredientsChanged.next(this.ingredientList);
    }

    public deleteIngredient(index: number): Ingredient
    {
        const deleted: Ingredient = this.ingredients.splice(index, 1)[0];
        this.ingredientsChanged.next(this.ingredientList);
        return deleted;
    }
}