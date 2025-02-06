import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  RESET_ERROR_STATUS,
  submitGetPersonValues,
  submitLogout,
} from "../../../../services/actions/form";
import { useEffect, useState } from "react";

export function Profile() {
  const {
    nameValue,
    emailValue,
    passwordValue,
    formRequest,
    formError,
    formSuccess,
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(submitGetPersonValues());
  }, [dispatch]);

  const [isEditable, setIsEditable] = useState({
    name: true,
    email: true,
    password: true,
  });

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isEdit, setIsEdit] = useState(false);

  function onIconClick(fieldName) {
    setIsEdit(true);
    setIsEditable((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
    if (!isEditable[fieldName]) {
      resetProfileForm();
    }
  }

  useEffect(() => {
    setUser({
      name: nameValue || "Загрузка...",
      email: emailValue || "Загрузка...",
      password: passwordValue || "",
    });
  }, [nameValue, emailValue, passwordValue]);

  function handleSetValue(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function resetProfileForm() {
    setUser({
      name: nameValue || "Загрузка...",
      email: emailValue || "Загрузка...",
      password: passwordValue || "",
    });
    setIsEditable({ name: true, email: true, password: true });
    setIsEdit(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      submitGetPersonValues({
        name: user.name ?? nameValue,
        email: user.email ?? emailValue,
        password: user.password ?? passwordValue,
      })
    );
    resetProfileForm();
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
          to={"/login"}
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
      <div className={styles.profile_inputs_wrapper}>
        <form className={styles.profile_form} onSubmit={onSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleSetValue}
            icon={"EditIcon"}
            value={user.name}
            name={"name"}
            error={formError}
            onIconClick={!isEdit ? () => onIconClick("name") : null}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            disabled={isEditable.name}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={handleSetValue}
            icon={"EditIcon"}
            value={user.email}
            name={"email"}
            error={formError}
            onIconClick={!isEdit ? () => onIconClick("email") : null}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isEditable.email}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={handleSetValue}
            icon={"EditIcon"}
            value={isEditable.password ? "******" : user.password}
            name={"password"}
            error={formError}
            onIconClick={!isEdit ? () => onIconClick("password") : null}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isEditable.password}
          />
          <Button
            htmlType={"submit"}
            name={"save"}
            type="primary"
            size="small"
            extraClass={
              "ml-2" +
              " " +
              styles.button_form +
              " " +
              (isEdit && styles.button_form_show)
            }
            required={true}
            disabled={formRequest || !isEdit}
          >
            Сохранить
          </Button>
          <Button
            htmlType={"button"}
            onClick={resetProfileForm}
            name={"cancel"}
            type="secondary"
            size="small"
            extraClass={
              "ml-2" +
              " " +
              styles.button_form +
              " " +
              (isEdit && styles.button_form_show)
            }
            disabled={formRequest || !isEdit}
          >
            Отмена
          </Button>
        </form>
      </div>
    </section>
  );
}
