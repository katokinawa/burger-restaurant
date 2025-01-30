import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import {
  RESET_ERROR_STATUS,
  submitRegister,
} from "../../../../services/actions/form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function Register() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    nameValue,
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
      submitRegister({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <section className={styles.register}>
      <form className={styles.register_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onFormChange}
          value={nameValue}
          name={"name"}
          error={formError}
          errorText={nameValue === "" ? "Поле не может быть пустым" : ""}
          size={"default"}
          extraClass="ml-1"
        />
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
            Поля электронной почты, пароля и имени являются обязательными для
            заполнения
          </p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={formRequest}
        >
          Зарегистрироваться
        </Button>
      </form>
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
