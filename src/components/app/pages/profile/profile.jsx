import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  submitGetPersonValues,
  submitLogout,
} from "../../../../services/actions/form";
import { useCallback, useEffect, useState } from "react";

export function Profile() {
  const { nameValue, emailValue, passwordValue, formRequest, formErrorStatus } =
    useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(submitGetPersonValues());
  }, [dispatch]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isEditable, setIsEditable] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function onIconClick(fieldName) {
    setIsEdit(true);
    setIsEditable((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
    if (!isEditable[fieldName]) {
      resetProfileForm();
    }
    setIsSuccess(false);
  }

  function handleSetValue(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSetUser = useCallback(() => {
    setUser({
      name: nameValue || "Загрузка...",
      email: emailValue || "Загрузка...",
      password: passwordValue || "",
    });
  }, [nameValue, emailValue, passwordValue]);

  function resetProfileForm() {
    handleSetUser();
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
    setIsSuccess(true);
    resetProfileForm();
  };

  useEffect(() => {
    handleSetUser();
  }, [handleSetUser]);

  const { name, email, password } = user;
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
            value={name}
            name={"name"}
            error={formErrorStatus}
            onIconClick={!isEdit ? () => onIconClick("name") : null}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            disabled={isEditable.name}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={handleSetValue}
            icon={"EditIcon"}
            value={email}
            name={"email"}
            error={formErrorStatus}
            onIconClick={!isEdit ? () => onIconClick("email") : null}
            errorText={""}
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
            value={isEditable.password ? "******" : password}
            name={"password"}
            error={formErrorStatus}
            onIconClick={!isEdit ? () => onIconClick("password") : null}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isEditable.password}
          />
          {isSuccess && !formErrorStatus && (
            <p className="text text_type_main-small">Успешно</p>
          )}
          {formErrorStatus && (
            <p className="text text_type_main-small">
              Пожалуйста, попробуйте позже
            </p>
          )}
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
