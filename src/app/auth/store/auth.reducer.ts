import { User } from "../../shared/model/user.model";
import * as AA from "./auth.actions";

export interface AuthState 
{
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: AuthState = initialState, action: AA.AuthAction)
{
    switch (action.type)
    {
        case AA.AUTHENTICATE_SUCCESS:
            const nUser: User = new User(
                (action as AA.AuthenticateSuccess).payload.email,
                (action as AA.AuthenticateSuccess).payload.userId, 
                (action as AA.AuthenticateSuccess).payload.token,
                (action as AA.AuthenticateSuccess).payload.expirationDate
            );
            return {
                ...state,
                authError: null,
                user: nUser,
                loading: false
            };

        case AA.LOGOUT:
            return {
                ...state,
                user: null
            };

        case AA.SIGNUP_START:
        case AA.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };

        case AA.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: (action as AA.AuthenticateFail).payload,
                loading: false
            };

        case AA.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };

        default: return state;
    }
}