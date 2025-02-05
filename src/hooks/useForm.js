import { useDispatch, useSelector } from "react-redux";
import {
  RESET_ERROR_STATUS,
  setFormValue,
  SHOW_PASSWORD_SWITCH,
} from "../services/actions/form";

export const useForm = () => {
  const dispatch = useDispatch();
  const {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    passwordVisible,
    code,
  } = useSelector((state) => state.form.form);

  const { formRequest, formError, formErrorMessage } = useSelector(
    (state) => state.form
  );

  const onShowPasswordSwitch = () => {
    dispatch({ type: SHOW_PASSWORD_SWITCH });
  };

  const handleFocus = () => {
    dispatch({ type: RESET_ERROR_STATUS });
  };

  const showError = (message) => {
    switch (formErrorMessage) {
      case 403: {
        return message;
      }
      case 401: {
        return message;
      }
      case 500: {
        return "Сервер временно недоступен";
      }
      case 404: {
        return "Ошибка";
      }
      default:
        return "Пожалуйста, попробуйте позже";
    }
  };

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  return {
    onShowPasswordSwitch,
    onFormChange,
    handleFocus,
    showError,
    nameValue,
    emailValue,
    passwordValue,
    passwordVisible,
    code,
    formRequest,
    formError,
  };
};
