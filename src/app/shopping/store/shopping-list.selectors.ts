import { createSelector } from "@ngrx/store";
import { shoppingListFeature } from "./shopping-list.reducer";
import { Ingredient } from "src/app/shared/Ingredient";

const {
    selectIngredients,
    selectEditedIngredient,
    selectEditedIngredientIndex
} = shoppingListFeature;

const selectIngredientsSorted = createSelector(
    selectIngredients,
    (ingredients: Ingredient[]) => [...ingredients].sort((a, b) => a.name.localeCompare(b.name)) 
);

export const shoppingListSelectors = {
    selectIngredients,
    selectEditedIngredient,
    selectEditedIngredientIndex,
    selectIngredientsSorted
};
