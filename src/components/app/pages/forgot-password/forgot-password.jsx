import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import {
  FORM_SUBMIT_ERROR,
  RESET_ERROR_STATUS,
  submitForgotPassword,
} from "../../../../services/actions/form";
import { useEffect } from "react";

export function ForgotPassword() {
  const {
    onFormChange,
    handleFocus,
    showError,
    emailValue,
    formRequest,
    formError,
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_ERROR_STATUS });
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailValue !== "") {
      dispatch(submitForgotPassword({ email: emailValue }));
    } else {
      dispatch({ type: FORM_SUBMIT_ERROR });
    }
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
          error={formError}
          errorText={""}
          required={true}
          onFocus={handleFocus}
        />
        <p className="text text_type_main-small">
          {formError && showError("")}
        </p>
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
