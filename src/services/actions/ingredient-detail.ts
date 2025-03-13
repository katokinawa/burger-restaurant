import { IItem } from "../../utils/types";

export const SET_SELECTED_INGREDIENT: 'SET_SELECTED_INGREDIENT' = "SET_SELECTED_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' = "DELETE_SELECTED_INGREDIENT";

export interface ISetSelectedIngredient {
  readonly type: typeof SET_SELECTED_INGREDIENT;
  readonly item: IItem | { _id?: null | string },
  readonly ingredientType: string,
}
export interface IDeleteSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
}

export type TIngredientDetailActions =
  | ISetSelectedIngredient
  | IDeleteSelectedIngredient
