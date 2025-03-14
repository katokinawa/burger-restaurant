import { ChangeEvent, ReactNode } from "react";
import { store } from "../main";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TFormsActions } from "../services/actions/form";
import { TIngredientDetailActions } from "../services/actions/ingredient-detail";
import { TIngredients } from "../services/actions/ingredients";
import { TOrderDetail } from "../services/actions/order-detail";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ITEMS,
  WS_SEND_ITEMS,
} from "../services/actions/websocket";

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

export type TWebsocketActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_ITEMS;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_ITEMS;
};

export type TItemsResponseOrders = {
  name: string;
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
export interface IItemsResponse {
  success: boolean;
  orders: TItemsResponseOrders[];
  total: number;
  totalToday: number;
}
