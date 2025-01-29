import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { submitLogin } from "../../../../services/actions/form";
import { useDispatch } from "react-redux";

export function Login() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    emailValue,
    passwordValue,
    passwordVisible,
    formRequest,
    errorMessage,
  } = useForm();
  const dispatch = useDispatch();

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
          isIcon={false}
        />
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={passwordVisible ? "HideIcon" : "ShowIcon"}
          value={passwordValue}
          name={"password"}
          error={false}
          onIconClick={onShowPasswordSwitch}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        {errorMessage && <p className="text text_type_main-small">Неправильный логин или пароль.</p>}
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
