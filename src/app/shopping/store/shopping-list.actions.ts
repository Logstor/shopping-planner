import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/Ingredient";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const MERGE_INGREDIENTS = '[Shopping List] Merge Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action
{
    readonly type: string = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action
{
    readonly type: string = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export class MergeIngredients implements Action
{
    readonly type: string = MERGE_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action
{
    readonly type: string = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action
{
    readonly type: string = DELETE_INGREDIENT;

    constructor() {}
}

export class StartEdit implements Action 
{
    readonly type: string = START_EDIT;

    /**
     * 
     * @param payload Needs to be index of the ingredient to edit.
     */
    constructor(public payload: number) {}
}

export class StopEdit implements Action 
{
    readonly type: string = STOP_EDIT;
}

export type ShoppingListAction = 
    | AddIngredient 
    | AddIngredients 
    | UpdateIngredient 
    | DeleteIngredient
    | StartEdit
    | StopEdit;