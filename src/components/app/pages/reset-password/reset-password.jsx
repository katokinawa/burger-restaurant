import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";

export function ResetPassword() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    password,
    code,
    passwordVisible,
  } = useForm();

  return (
    <section className={styles.reset_password}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input
        type={passwordVisible ? "text" : "password"}
        placeholder={"Введите новый пароль"}
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
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onFormChange}
        icon={passwordVisible ? "HideIcon" : "ShowIcon"}
        value={code}
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
