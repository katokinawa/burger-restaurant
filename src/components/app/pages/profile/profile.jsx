import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  submitGetPersonValues,
  submitLogout,
  SWITCH_FIELD_EDIT,
} from "../../../../services/actions/form";
import { useEffect } from "react";

export function Profile() {
  const {
    onFormChange,
    nameValue,
    emailValue,
    passwordValue,
    passwordVisible,
    formRequest,
    formError,
    editDisabled,
  } = useForm();

  const dispatch = useDispatch();

  // UseEffects
  useEffect(() => {
    dispatch(submitGetPersonValues());
  }, [dispatch]);

  function onIconClick() {
    dispatch({ type: SWITCH_FIELD_EDIT });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch();
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile_navlinks}>
        <NavLink to={"/profile"} className={styles.link_button}>
          {({ isActive }) => (
            <p
              className={
                styles.link +
                ` text text_type_main-medium ${
                  !isActive && styles.link_disabled
                }`
              }
            >
              Профиль
            </p>
          )}
        </NavLink>
        <NavLink to={"/profile/orders"} className={styles.link_button}>
          {({ isActive }) => (
            <p
              className={
                styles.link +
                ` text text_type_main-medium ${
                  !isActive && styles.link_disabled
                }`
              }
            >
              История заказов
            </p>
          )}
        </NavLink>
        <NavLink
          to={`/login`}
          className={styles.link_button}
          onClick={() => {
            dispatch(submitLogout());
          }}
        >
          {({ isActive }) => (
            <p
              className={
                styles.link +
                ` text text_type_main-medium ${
                  !isActive && styles.link_disabled
                }`
              }
            >
              Выход
            </p>
          )}
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.edit_profile_form} onSubmit={onSubmit}>
        <div className={styles.profile_inputs}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onFormChange}
            icon={"EditIcon"}
            value={nameValue}
            name={"name"}
            error={formError}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            disabled={editDisabled}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={onFormChange}
            icon={"EditIcon"}
            value={emailValue}
            name={"name"}
            error={formError}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={editDisabled}
          />
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder={"Пароль"}
            onChange={onFormChange}
            icon={"EditIcon"}
            value={passwordValue}
            name={"name"}
            error={formError}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={editDisabled}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass="ml-2"
            required={true}
            disabled={formRequest || editDisabled}
          >
            Сохранить
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass="ml-2"
            disabled={formRequest || editDisabled}
          >
            Отмена
          </Button>
        </div>
      </form>
    </section>
  );
}
