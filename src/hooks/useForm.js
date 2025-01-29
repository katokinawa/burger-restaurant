import { useDispatch, useSelector } from "react-redux";
import { setFormValue, SHOW_PASSWORD_SWITCH } from "../services/actions/form";

export const useForm = () => {
  const dispatch = useDispatch();

  const onShowPasswordSwitch = () => {
    dispatch({ type: SHOW_PASSWORD_SWITCH });
  };

  const {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    passwordVisible,
    code,
  } = useSelector((state) => state.form.form);
  const { formRequest, formError, errorMessage } = useSelector(
    (state) => state.form
  );

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };
  return {
    onShowPasswordSwitch,
    onFormChange,
    nameValue,
    emailValue,
    passwordValue,
    passwordVisible,
    code,
    formRequest,
    formError,
    errorMessage,
  };
};
