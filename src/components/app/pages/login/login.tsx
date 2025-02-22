import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import {
  RESET_ERROR_STATUS,
  RESET_FORM,
  submitLogin,
} from "../../../../services/actions/form";
import { useDispatch } from "react-redux";
import { FormEvent, useEffect } from "react";
import { getCookie } from "../../../../utils/getCookieValue";
import { TUseFormReturn } from "../../../../utils/types";

export function Login() {
  const location = useLocation();
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
  }: TUseFormReturn = useForm();
  const dispatch = useDispatch();
  const token = getCookie().refreshToken;
  const from = location.state?.from || "/";

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
    dispatch({ type: RESET_FORM });
  }, [dispatch]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // @ts-expect-error Пока игнорируем redux типизацию
    dispatch(submitLogin({ email: emailValue, password: passwordValue }));
  };

  if (token) {
    return <Navigate to={from} />;
  }
  if (!token) {
    return (
      <section className={styles.login}>
        <form className={styles.login_form} onSubmit={onSubmit}>
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            onChange={onFormChange}
            placeholder={"Почта"}
            value={emailValue ?? ""}
            name={"email"}
            errorText={"Email должен быть формата @domain.ru"}
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
}
