import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [isEmail, setIsEmail] = useState("");

  const onChangeEmail = (e) => {
    setIsEmail(e.target.value);
  };
  return (
    <section className={styles.forgot_password}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <EmailInput
        onChange={onChangeEmail}
        placeholder={"Укажите e-mail"}
        value={isEmail}
        name={"email"}
        isIcon={false}
      />
      <Button htmlType="button" type="primary" size="medium">
        Восстановить
      </Button>
      <div className={styles.forgot_password_footer}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <span className={styles.forgot_password_footer_span}>
            <Link to="/login">Войти</Link>
          </span>
        </p>
      </div>
    </section>
  );
}
