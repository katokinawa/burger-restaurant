import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ResetPassword() {
  const [isCode, setIsCode] = useState("");
  const [isPassword, setIsPassword] = useState({
    passwordValue: "",
    passwordVisible: false,
  });

  const onChangeCode = (e) => {
    setIsCode(e.target.value);
  };

  const onShowPasswordSwitch = () => {
    setIsPassword({
      ...isPassword,
      passwordVisible: !isPassword.passwordVisible,
    });
  };

  const onChangePassword = (e) => {
    setIsPassword({
      ...isPassword,
      passwordValue: e.target.value,
    });
  };

  const { passwordValue, passwordVisible } = isPassword;
  return (
    <section className={styles.reset_password}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Введите новый пароль"}
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
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onChangeCode}
        icon={passwordVisible ? "HideIcon" : "ShowIcon"}
        value={isCode}
        name={"code"}
        error={false}
        onIconClick={onShowPasswordSwitch}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Button htmlType="button" type="primary" size="medium">
        Сохранить
      </Button>
      <div className={styles.reset_password_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <span className={styles.reset_password_footer_span}>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
