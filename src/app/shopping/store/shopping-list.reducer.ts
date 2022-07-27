import * as SLA from "./shopping-list.actions";
import { Ingredient } from "../../shared/Ingredient";

export interface ShoppingState 
{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState
{
    shoppingList: ShoppingState;
}

const initialState: ShoppingState = {
    ingredients: [
        new Ingredient('Danskvand', 3)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: ShoppingState = initialState, action: SLA.ShoppingListAction) 
{
    switch (action.type)
    {
        case SLA.ADD_INGREDIENT: 
            return {
                ... state,
                ingredients: [... state.ingredients, (action as SLA.AddIngredient).payload]
            };

        case SLA.ADD_INGREDIENTS:
            return {
                ... state,
                ingredients: [... state.ingredients, ... (action as SLA.AddIngredients).payload]
            };
        
        case SLA.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[(action as SLA.UpdateIngredient).payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...(action as SLA.UpdateIngredient).payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[(action as SLA.UpdateIngredient).payload.index] = updatedIngredient;
        
            return {
                ... state,
                ingredients: updatedIngredients
            };

        case SLA.DELETE_INGREDIENT:
            return {
                ... state,
                ingredients: state.ingredients.filter((ig: Ingredient, idx: number) => {
                    return idx !== (action as SLA.DeleteIngredient).payload;
                })
            };

        case SLA.START_EDIT:
            return {
                ... state,
                editedIngredientIndex: (action as SLA.StartEdit).payload,
                editedIngredient: { ...state.ingredients[(action as SLA.StartEdit).payload] }
            };

        case SLA.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default: return state;
    }
}