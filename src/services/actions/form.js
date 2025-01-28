export const ADD_FORM_VALUE = "ADD_FORM_VALUE";

export const FORM_SUBMIT_REQUEST = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS = "FORM_REGISTER_SUBMIT_SUCCESS";
export const FORM_SUBMIT_ERROR = "FORM_SUBMIT_ERROR";

export const SHOW_PASSWORD_SWITCH = "SHOW_PASSWORD_SWITCH";

export const setFormValue = (field, value) => ({
  type: ADD_FORM_VALUE,
  field,
  value,
});
