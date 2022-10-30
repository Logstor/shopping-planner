import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HeaderState } from "./header.state";

export const selectHeaderState = createFeatureSelector<HeaderState>('header');

export const selectSaveRequest = createSelector(
    selectHeaderState,
    state => state.onSave
);