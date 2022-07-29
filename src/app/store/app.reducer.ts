import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';
import * as fromRecipe from 'src/app/recipe/store/recipes.reducer';

export interface AppState
{
    shoppingList: fromShoppingList.ShoppingState;
    recipes: fromRecipe.RecipeState;
    auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    recipes: fromRecipe.recipeReducer,
    auth: fromAuth.authReducer
};