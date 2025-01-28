import { useDispatch, useSelector } from "react-redux";
import { setFormValue, SHOW_PASSWORD_SWITCH } from "../services/actions/form";

export const useForm = () => {
  const dispatch = useDispatch();

  const onShowPasswordSwitch = () => {
    dispatch({ type: SHOW_PASSWORD_SWITCH });
  };

  const { name, email, password, passwordVisible, code } = useSelector(
    (state) => state.form.form
  );

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };
  return {
    onShowPasswordSwitch,
    onFormChange,
    name,
    email,
    password,
    passwordVisible,
    code,
  };
};
