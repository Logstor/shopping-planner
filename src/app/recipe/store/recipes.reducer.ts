import { UpdateIngredient } from "src/app/shopping/store/shopping-list.actions";
import { Recipe } from "../recipes/recipe.model";
import * as RA from "./recipes.actions";

export interface RecipeState
{
    recipes: Recipe[]
}

const initialState: RecipeState = {
    recipes: []
}

export function recipeReducer(state: RecipeState = initialState, action: RA.RecipeAction): RecipeState
{
    switch (action.type)
    {
        case RA.SET_RECIPES:
            return {
                ...state,
                recipes: [...(action as RA.SetRecipes).payload]
            };
        
        case RA.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, (action as RA.AddRecipe).payload.recipe]
            };
            
        case RA.UPDATE_RECIPE:
            const updatedRecipe: Recipe = { 
                ...state.recipes[(action as RA.UpdateRecipe).payload.index],
                ...(action as RA.UpdateRecipe).payload.recipe
            }

            const updatedRecipes: Recipe[] = [...state.recipes];
            updatedRecipes[(action as RA.UpdateRecipe).payload.index] = updatedRecipe;
            
            return {
                ...state,
                recipes: updatedRecipes
            };

        case RA.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter( (recipe, index) => {
                    return index !== (action as RA.DeleteRecipe).payload;
                })
            };

        default: return state;
    }
}