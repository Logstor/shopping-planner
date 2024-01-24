import { createFeature, createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../shared/model/Ingredient";
import { ShoppingList } from "src/app/shared/model/shopping-list";
import { shoppingListActions } from "./shopping-list.actions";

export interface ShoppingState 
{
    shoppingLists: ShoppingList[];
    sharedShoppingLists: ShoppingList[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingState = {
    shoppingLists: [],
    sharedShoppingLists: [],
    editedIngredient: null,
    editedIngredientIndex: -1
};

const shoppingListReducer = createReducer(
    initialState,

    on(shoppingListActions.addShoppingList, (state, { list, isShared}) => ({
        ...state,
        shoppingLists: isShared ? state.shoppingLists : [ ...state.shoppingLists, list],
        sharedShoppingLists: isShared ? [ ...state.sharedShoppingLists, list] : state.sharedShoppingLists
    })),

    on(shoppingListActions.updateShoppingList, (state, { list, isShared }) => {
        // Find index of the list to update
        const idx: number = isShared ? 
            state.sharedShoppingLists.findIndex(l => l.id === list.id) :
            state.shoppingLists.findIndex(l => l.id === list.id);

        // Guard against invalid index
        if (idx === -1)
        {
            console.warn(`
                [shopping-list.reducer.ts] updateShoppingList: list with id ${ list.id } not found - 
                adding the shopping list instead
            `);

            return {
                ...state,
                shoppingLists: isShared ? state.shoppingLists : [ ...state.shoppingLists, list ],
                sharedShoppingLists: isShared ? [ ...state.sharedShoppingLists, list] : state.sharedShoppingLists
            };
        }

        // Update the item in the list
        let nState: ShoppingState;
        if (isShared)
        {
            const nShoppingLists = [ ...state.sharedShoppingLists ];
            nShoppingLists[idx] = list;
            nState = {
                ...state,
                sharedShoppingLists: nShoppingLists
            };
        }
        else
        {
            const nShoppingLists = [ ...state.shoppingLists ];
            nShoppingLists[idx] = list;
            nState = {
                ...state,
                shoppingLists: nShoppingLists
            };
        }

        return nState;
    }),

    on(shoppingListActions.deleteShoppingList, (state, { listId, isShared }) => ({
        ...state,
        shoppingLists: isShared ? state.shoppingLists : state.shoppingLists.filter(l => l.id !== listId),
        sharedShoppingLists: isShared ? state.sharedShoppingLists.filter(l => l.id !== listId) : state.sharedShoppingLists
    })),

    on(shoppingListActions.startEdit, (state, { ingredientIndex, listId, isShared }) => {
        // Find the ingredient to edit
        const ingredient: Ingredient = isShared ?
            state.sharedShoppingLists.find(l => l.id === listId).ingredients[ingredientIndex]:
            state.shoppingLists.find(l => l.id === listId).ingredients[ingredientIndex];

        return {
            ...state,
            editedIngredientIndex: ingredientIndex,
            editedIngredient: ingredient
        };
    }),

    on(shoppingListActions.stopEdit, (state) => ({
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
    }))
);

export const shoppingListFeature = createFeature({
    name: 'shoppingList',
    reducer: shoppingListReducer
});
