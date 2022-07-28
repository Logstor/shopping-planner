import { User } from "../user.model";

export interface AuthState 
{
    user: User;
}

const initialState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initialState, action)
{
    return state;
}