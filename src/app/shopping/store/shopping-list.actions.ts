import { createAction, props } from "@ngrx/store";

import { Ingredient } from "src/app/shared/model/Ingredient";
import { ShoppingList } from "src/app/shared/model/shopping-list";

/**
 * When the component requests to add an ingredient to a given shopping list.
 * 
 * This should be handled by the effects.
 */
const componentAddIngredient = createAction(
    '[Shopping List Component] Add Ingredient',
    props<{ ingredient: Ingredient, listId: string}>()
);

/**
 * When the component requests to update an ingredient in a given shopping list.
 * 
 * This should be handled by the effects.
 */
const componentUpdateIngredient = createAction(
    '[Shopping List Component] Add Ingredient',
    props<{ ingredient: Ingredient, listId: string}>()
);

/**
 * When the component requests to remove an ingredient from a given shopping list.
 * 
 * This should be handled by the effects.
 */
const componentRemoveIngredient = createAction(
    '[Shopping List Component] Remove ingredient',
    props<{ ingredientName: string, listId: string}>()
);

const startEdit = createAction(
    '[Shopping List Component] Start Edit',
    props<{ 
        ingredientIndex: number, 
        listId: string,
        isShared: boolean
    }>()
);

const stopEdit = createAction(
    '[Shopping List Component] Stop Edit'
);

const addShoppingList = createAction(
    '[Shopping List Effects] Add Shopping List',
    props<{ list: ShoppingList, isShared: boolean }>()
);

const updateShoppingList = createAction(
    '[Shopping List Effects] Update Shopping List',
    props<{ list: ShoppingList, isShared: boolean }>()
);

const deleteShoppingList = createAction(
    '[Shopping List Effects] Delete Shopping List',
    props<{ listId: string, isShared: boolean }>()
);

export const shoppingListActions = {
    componentAddIngredient,
    componentRemoveIngredient,
    startEdit,
    stopEdit,
    addShoppingList,
    updateShoppingList,
    deleteShoppingList
};
