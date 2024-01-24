import { Unit } from "./unit.enum";

export class Ingredient
{
    constructor(
        public readonly name: string, 
        public readonly amount: number,
        public readonly unit: Unit = Unit.Gram
    ) { }
}
