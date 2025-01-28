import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";

export function Login() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    email,
    password,
    passwordVisible,
  } = useForm();

  return (
    <section className={styles.login}>
      <p className="text text_type_main-medium">Вход</p>
      <EmailInput
        onChange={onFormChange}
        value={email}
        name={"email"}
        isIcon={false}
      />
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Пароль"}
        onChange={onFormChange}
        icon={passwordVisible ? "HideIcon" : "ShowIcon"}
        value={password}
        name={"password"}
        error={false}
        onIconClick={onShowPasswordSwitch}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Button htmlType="button" type="primary" size="medium">
        Войти
      </Button>
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
