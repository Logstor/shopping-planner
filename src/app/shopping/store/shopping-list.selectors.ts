import { createSelector } from "@ngrx/store";
import { shoppingListFeature } from "./shopping-list.reducer";

const {
    selectIngredients,
    selectEditedIngredient,
    selectEditedIngredientIndex
} = shoppingListFeature;

const selectIngredientsSorted = createSelector(
    selectIngredients,
    (ingredients) => ingredients.sort((a, b) => a.name.localeCompare(b.name))
);

export const shoppingListSelectors = {
    selectIngredients,
    selectEditedIngredient,
    selectEditedIngredientIndex,
    selectIngredientsSorted
};
