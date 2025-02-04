import { request } from "../../utils/request";

export const ADD_FORM_VALUE = "ADD_FORM_VALUE";

export const FORM_SUBMIT_REQUEST = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS = "FORM_REGISTER_SUBMIT_SUCCESS";
export const FORM_SUBMIT_ERROR = "FORM_SUBMIT_ERROR";

export const SHOW_PASSWORD_SWITCH = "SHOW_PASSWORD_SWITCH";

export const RESET_ERROR_STATUS = "RESET_ERROR_STATUS";

export const setFormValue = (field, value) => ({
  type: ADD_FORM_VALUE,
  field,
  value,
});

export function submitLogin(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        window.history.pushState(null, "", "/");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitRegister(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        window.history.pushState(null, "", "/login");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitLogout(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        window.history.pushState(null, "", "/login");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitRefreshToken(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}

export function submitForgotPassword(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    if (formValues) {
      request("password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((item) => {
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
            item,
          });
          window.history.replaceState(null, "", "/reset-password");
          window.history.go(0);
        })
        .catch(() => {
          dispatch({
            type: FORM_SUBMIT_ERROR,
          });
        });
    }
  };
}

export function submitResetPassword(formValues) {
  return function (dispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((item) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          item,
        });
        window.history.pushState(null, "", "/login");
        window.history.go(0);
      })
      .catch((error) => {
        dispatch({
          type: FORM_SUBMIT_ERROR,
          error,
        });
      });
  };
}
