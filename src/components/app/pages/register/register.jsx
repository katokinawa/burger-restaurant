import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { submitRegister } from "../../../../services/actions/form";
import { useDispatch } from "react-redux";

export function Register() {
  const {
    onShowPasswordSwitch,
    onFormChange,
    nameValue,
    emailValue,
    passwordValue,
    passwordVisible,
    formRequest,
  } = useForm();

  const dispatch = useDispatch();

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
          error={false}
          onIconClick={onShowPasswordSwitch}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
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
