import { Ingredient } from "./Ingredient";

export class ShoppingList
{
    constructor(
        public readonly owner: String,
        public readonly name: String,
        public readonly createdAt: Date,
        public readonly ingredients: Ingredient[] = []
    ) {}
}
