import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';
import * as fromRecipe from 'src/app/recipe/store/recipes.reducer';
import { HeaderState } from '../header/store/header.state';
import { headerReducer } from '../header/store/header.reducer';

export interface AppState
{
    shoppingList: fromShoppingList.ShoppingState;
    recipes: fromRecipe.RecipeState;
    auth: fromAuth.AuthState;
    header: HeaderState;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    recipes: fromRecipe.recipeReducer,
    auth: fromAuth.authReducer,
    header: headerReducer
};