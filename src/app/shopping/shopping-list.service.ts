import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/Ingredient";

@Injectable({providedIn: 'root'})
export class ShoppingListService
{
    private ingredients: Ingredient[] = [
        new Ingredient("Hvidløg", 100),
        new Ingredient("Ingefær", 50)
    ];

    public readonly ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter();

    public get ingredientList()
    {
        return this.ingredients.slice();
    }

    public addIngredient(name: string, amount: number): void
    {
        const nIngredient: Ingredient = new Ingredient(name, amount);
        this.ingredients.push(
            nIngredient
        );
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    public addIngredients(nIngredients: Ingredient[])
    {
        this.ingredients.push(... nIngredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}