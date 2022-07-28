import * as SLA from "./shopping-list.actions";
import { Ingredient } from "../../shared/Ingredient";

export interface ShoppingState 
{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...(action as SLA.UpdateIngredient).payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
        
            return {
                ... state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case SLA.DELETE_INGREDIENT:
            return {
                ... state,
                ingredients: state.ingredients.filter((ig: Ingredient, idx: number) => {
                    return idx !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
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