import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import {
  RESET_ERROR_STATUS,
  RESET_FORM,
  submitLogin,
} from "../../../../services/actions/form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../../../utils/getCookieValue";

export function Login() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    handleFocus,
    showMessageStatus,
    emailValue,
    passwordValue,
    passwordVisible,
    formRequest,
    formErrorStatus,
  } = useForm();
  const dispatch = useDispatch();
  const token = getCookie().refreshToken;

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
    dispatch({
      type: RESET_FORM,
    });
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      submitLogin({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  if (token) return <Navigate to="/profile" replace />;
  return (
    <section className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={onFormChange}
          value={emailValue}
          name={"email"}
          error={formErrorStatus}
          errorText={""}
          required={true}
          onFocus={handleFocus}
        />
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={passwordVisible ? "HideIcon" : "ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={formErrorStatus}
          onIconClick={onShowPasswordSwitch}
          errorText={""}
          size={"default"}
          extraClass="ml-1"
          required={true}
          onFocus={handleFocus}
        />
        <p className="text text_type_main-small">
          {formErrorStatus &&
            showMessageStatus("Неправильный логин или пароль")}
        </p>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={formRequest}
        >
          Войти
        </Button>
      </form>
      <div className={styles.login_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?{" "}
          <span className={styles.login_footer_span}>
            <Link to="/register">Зарегистрироваться</Link>
          </span>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <span className={styles.login_footer_span}>
            <Link to="/forgot-password">Восстановить пароль</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
