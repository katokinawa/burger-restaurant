import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { submitForgotPassword } from "../../../../services/actions/form";

export function ForgotPassword() {
  const { onFormChange, emailValue, formRequest } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForgotPassword({ email: emailValue }));
  };

  return (
    <section className={styles.forgot_password}>
      <form className={styles.forgot_password_form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <EmailInput
          onChange={onFormChange}
          placeholder={"Укажите e-mail"}
          value={emailValue}
          name={"email"}
          isIcon={false}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={formRequest}
        >
          Восстановить
        </Button>
      </form>
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
