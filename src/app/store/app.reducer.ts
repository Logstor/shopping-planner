import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from 'src/app/shopping/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';

export interface AppState
{
    shoppingList: fromShoppingList.ShoppingState;
    auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};