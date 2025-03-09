import { v4 as uuidv4 } from 'uuid';
import { IItem } from '../../utils/types';
export const ADD_BURGER_INGREDIENT: 'ADD_BURGER_INGREDIENT' = "ADD_BURGER_INGREDIENT";
export const ADD_BURGER_BUN: 'ADD_BURGER_BUN' = "ADD_BURGER_BUN";
export const DELETE_BURGER_INGREDIENT: 'DELETE_BURGER_INGREDIENT' = "DELETE_BURGER_INGREDIENT";

export const SWAP_BURGER_INGREDIENT: 'SWAP_BURGER_INGREDIENT' = "SWAP_BURGER_INGREDIENT";

export const RESET_BURGER_CONSTRUCTOR: 'RESET_BURGER_CONSTRUCTOR' = "RESET_BURGER_CONSTRUCTOR";
export interface IAddBurgerIngredient {
  readonly type: typeof ADD_BURGER_INGREDIENT;
  readonly payload: IItem;
}
export interface IAddBurgerBun {
  readonly type: typeof ADD_BURGER_BUN;
  readonly item: IItem;
}
export interface IDeleteBurgerIngredient {
  readonly type: typeof DELETE_BURGER_INGREDIENT;
  readonly item: IItem[];
}
export interface ISwapBurgerIngredient {
  readonly type: typeof SWAP_BURGER_INGREDIENT;
  readonly item: IItem[];
}
export interface IResetBurgerIngredient {
  readonly type: typeof RESET_BURGER_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddBurgerIngredient
  | IAddBurgerBun
  | IDeleteBurgerIngredient
  | ISwapBurgerIngredient
  | IResetBurgerIngredient;

export const addIngredient = (item: IItem): IAddBurgerIngredient => {
  return {
    type: ADD_BURGER_INGREDIENT,
    payload: {
      ...item,
      uniqueId: uuidv4(),
    },
  };
};
