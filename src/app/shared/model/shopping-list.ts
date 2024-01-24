import { Ingredient } from "./Ingredient";

export class ShoppingList
{
    constructor(
        public readonly id: string,
        public readonly owner: string,
        public readonly name: string,
        public readonly createdAt: Date,
        public readonly ingredients: Ingredient[] = []
    ) {}
}
