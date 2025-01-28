import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";

export function Register() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    name,
    email,
    password,
    passwordVisible,
  } = useForm();

  return (
    <section className={styles.register}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onFormChange}
        value={name}
        name={"name"}
        error={false}
        onIconClick={onShowPasswordSwitch}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
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
