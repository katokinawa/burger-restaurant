import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Register() {
  const [isEmail, setIsEmail] = useState("");
  const [isName, setIsName] = useState("");
  const [isPassword, setIsPassword] = useState({
    passwordValue: "",
    passwordVisible: false,
  });

  const onChangeEmail = (e) => {
    setIsEmail(e.target.value);
  };

  const onChangeName = (e) => {
    setIsName(e.target.value);
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

  const { passwordValue, passwordVisible } = isPassword;
  return (
    <section className={styles.register}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChangeName}
        value={isName}
        name={"name"}
        error={false}
        onIconClick={onShowPasswordSwitch}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <EmailInput
        onChange={onChangeEmail}
        value={isEmail}
        name={"email"}
        isIcon={false}
      />
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Пароль"}
        onChange={onChangePassword}
        icon={passwordVisible ? "HideIcon" : "ShowIcon"}
        value={passwordValue}
        name={"password"}
        error={false}
        onIconClick={onShowPasswordSwitch}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <div className={styles.register_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <span className={styles.register_footer_span}>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
