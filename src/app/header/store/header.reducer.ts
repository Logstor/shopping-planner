import { createReducer, on } from "@ngrx/store";
import { saveRequest } from "./header.actions";
import { HeaderState } from "./header.state";

const initialState: HeaderState = {
    onSave: false
};

export const headerReducer = createReducer(
    initialState,
    on(
        saveRequest,
        state => ({
            ...state,
            onSave: true
        })
    ),
)