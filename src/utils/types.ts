import { ChangeEvent, ReactNode } from "react";
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

export type TUseFormReturn = {
  onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showMessageStatus: (message: string) => string;
  handleFocus: () => void;
  onShowPasswordSwitch: () => void;
  nameValue: string;
  emailValue: string;
  passwordValue: string;
  formErrorStatusMessage: number;
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