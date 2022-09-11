import * as SLA from "./shopping-list.actions";
import { Ingredient } from "../../shared/Ingredient";

export interface ShoppingState 
{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingState = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: ShoppingState = initialState, action: SLA.ShoppingListAction) 
{
    switch (action.type)
    {
        case SLA.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: [...(action as SLA.SetIngredients).payload]
            };

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

        case SLA.MERGE_INGREDIENTS:
            // Lists to merged in the end
            const oldList: Ingredient[] = [ ...state.ingredients ];
            const toBeAdded: Ingredient[] = [];

            // Update duplicates
            (action as SLA.MergeIngredients).payload.forEach(
                (nIngredient: Ingredient) => {
                    const index: number = oldList.findIndex((old: Ingredient) => old.name.toLowerCase() === nIngredient.name.toLowerCase());

                    if (index === -1) toBeAdded.push(nIngredient);
                    else oldList[index] = new Ingredient(nIngredient.name, nIngredient.amount + oldList[index].amount);
                }
            )

            oldList.push(...toBeAdded);

            return { 
                ...state,
                ingredients: oldList
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