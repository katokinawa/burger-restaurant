import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import {
  RESET_ERROR_STATUS,
  submitLogin,
} from "../../../../services/actions/form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function Login() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    emailValue,
    passwordValue,
    passwordVisible,
    formRequest,
    formError,
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
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

  return (
    <section className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={onFormChange}
          value={emailValue}
          name={"email"}
          error={formError}
          errorText={emailValue === "" ? "Поле не может быть пустым" : ""}
        />
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={passwordVisible ? "HideIcon" : "ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={formError}
          onIconClick={onShowPasswordSwitch}
          errorText={passwordValue === "" ? "Поле не может быть пустым" : ""}
          size={"default"}
          extraClass="ml-1"
        />
        {formError && (
          <p className="text text_type_main-small">
            Неправильный логин или пароль
          </p>
        )}
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
