import {
  ADD_FORM_VALUE,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  SHOW_PASSWORD_SWITCH,
} from "../actions/form";

const initialState = {
  form: {
    name: "",
    password: "",
    passwordVisible: false,
    email: "",
    code: "",
  },
  formRequest: false,
  formError: false,
};

export const form = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT_REQUEST: {
      return {
        ...state,
        formRequest: true,
      };
    }
    case FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form,
        },
        formRequest: false,
      };
    }
    case FORM_SUBMIT_ERROR: {
      return {
        ...state,
        formRequest: false,
        formError: true,
      };
    }
    case SHOW_PASSWORD_SWITCH: {
      return {
        ...state,
        form: {
          ...state.form,
          passwordVisible: !state.form.passwordVisible,
        },
      };
    }
    case ADD_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    default: {
      return state;
    }
  }
};
