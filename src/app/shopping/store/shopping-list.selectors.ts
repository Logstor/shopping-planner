import { shoppingListFeature } from "./shopping-list.reducer";

const {
    selectShoppingLists,
    selectSharedShoppingLists,
    selectEditedIngredient,
    selectEditedIngredientIndex
} = shoppingListFeature;

export const shoppingListSelectors = {
    selectShoppingLists,
    selectSharedShoppingLists,
    selectEditedIngredient,
    selectEditedIngredientIndex
};
