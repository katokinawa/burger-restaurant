import {
  ADD_FORM_VALUE,
  FORM_SUBMIT_ERROR,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  RESET_ERROR_STATUS,
  SHOW_PASSWORD_SWITCH,
  SWITCH_FIELD_EDIT,
} from "../actions/form";

const initialState = {
  form: {
    name: "",
    password: "",
    passwordVisible: false,
    email: "",
    code: "",
    token: "",
  },
  formRequest: false,
  formError: false,
  editDisabled: true,
  formErrorMessage: "",
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
        formError: false,
      };
    }
    case FORM_SUBMIT_ERROR: {
      return {
        ...state,
        formRequest: false,
        formError: true,
        formErrorMessage: action.error,
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
    case SWITCH_FIELD_EDIT: {
      return {
        ...state,
        editDisabled: !state.editDisabled,
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
    case RESET_ERROR_STATUS: {
      return {
        ...state,
        formError: false,
      };
    }
    default: {
      return state;
    }
  }
};
