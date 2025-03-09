import { ChangeEvent, ReactNode } from "react";
import { store } from "../main";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TFormsActions } from "../services/actions/form";
import { TIngredientDetailActions } from "../services/actions/ingredient-detail";
import { TIngredients } from "../services/actions/ingredients";
import { TOrderDetail } from "../services/actions/order-detail";

export interface IItem {
  _id: string;
  name: string;
  type: string;
  uniqueId: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
  token?: string;
}

export interface IOrderDetailValues {
  name: string;
  order: { number: number };
  success: boolean;
}

export type TUseFormReturn = {
  onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showMessageStatus: (message: string) => string;
  handleFocus: () => void;
  onShowPasswordSwitch: () => void;
  nameValue: string;
  emailValue: string;
  passwordValue: string;
  formErrorStatusCode?: number;
  passwordVisible: boolean;
  code: string;
  formRequest: boolean;
  formErrorStatus: boolean;
  formSuccess: boolean;
};

export interface TModal {
  handleClose: () => void;
  isModalOpen?: boolean;
  children: ReactNode;
}

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TBurgerConstructorActions
  | TFormsActions
  | TIngredientDetailActions
  | TIngredients
  | TOrderDetail;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
