import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from 'src/app/auth/store/auth.reducer';
import * as fromRecipe from 'src/app/recipe/store/recipes.reducer';
import { HeaderState } from '../header/store/header.state';
import { headerReducer } from '../header/store/header.reducer';

export interface AppState
{
    recipes: fromRecipe.RecipeState;
    auth: fromAuth.AuthState;
    header: HeaderState;
}

export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipe.recipeReducer,
    auth: fromAuth.authReducer,
    header: headerReducer
};
