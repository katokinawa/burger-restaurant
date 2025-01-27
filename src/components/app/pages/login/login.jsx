import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  // States
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState({
    passwordValue: "",
    passwordVisible: false,
  });

  // Refs
  const inputRef = useRef(null);

  // Functions
  const onChangeEmail = (e) => {
    setIsEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setIsPassword({
      ...isPassword,
      passwordValue: e.target.value,
    });
  };

  const onShowPasswordSwitch = () => {
    setIsPassword({
      ...isPassword,
      passwordVisible: !isPassword.passwordVisible,
    });
  };

  // JSX
  const { passwordValue, passwordVisible } = isPassword;
  return (
    <section className={styles.login}>
      <p className="text text_type_main-medium">Вход</p>
      <EmailInput
        onChange={onChangeEmail}
        value={isEmail}
        name={"email"}
        isIcon={false}
      />
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Password"}
        onChange={onChangePassword}
        icon={passwordVisible ? "HideIcon" : "ShowIcon"}
        value={passwordValue}
        name={"password"}
        error={false}
        ref={inputRef}
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
