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
} from "../../../../services/actions/form";
import { useEffect, useState } from "react";

export function Profile() {
  const [isDisallowEdit, setIsDisallowEdit] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [isEdit, setIsEdit] = useState(false);

  const {
    onFormChange,
    nameValue,
    emailValue,
    passwordValue,
    formRequest,
    formError,
  } = useForm();

  const dispatch = useDispatch();

  // UseEffects
  useEffect(() => {
    dispatch(submitGetPersonValues());
  }, [dispatch]);

  function onIconClick(e) {
    const elementAllowEdit = e.target.closest("div").previousSibling.name;
    setIsDisallowEdit({
      ...isDisallowEdit,
      [elementAllowEdit]: !isDisallowEdit[elementAllowEdit],
    });

    // Даём кнопкам сохранения и отмены понять, что мы в режиме редактирования
    // и кнопки можно включать
    setIsEdit(true);

    // Если пользователь передумал изменять данные - возвращаем исходные данные
    if (!isDisallowEdit[elementAllowEdit]) {
      setDefaultProfileForm();
      dispatch(submitGetPersonValues());
    }
  }

  const setDefaultProfileForm = () => {
    setIsDisallowEdit({
      ...isDisallowEdit,
      name: true,
      email: true,
      password: true,
    });
    setIsEdit(false);
  };

  const onSubmit = (e) => {
    const formName = e.target.name.value;
    const formEmail = e.target.email.value;
    const formPassword = e.target.password.value;

    e.preventDefault();
    setDefaultProfileForm();
    dispatch(
      submitGetPersonValues({
        name: formName || nameValue,
        email: formEmail || emailValue,
        password: formPassword || passwordValue,
      })
    );
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
            onChange={onFormChange}
            icon={"EditIcon"}
            value={nameValue}
            name={"name"}
            error={formError}
            onIconClick={!isEdit ? onIconClick : ""}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            disabled={isDisallowEdit.name}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={onFormChange}
            icon={"EditIcon"}
            value={emailValue}
            name={"email"}
            error={formError}
            onIconClick={!isEdit ? onIconClick : ""}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isDisallowEdit.email}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={onFormChange}
            icon={"EditIcon"}
            value={isDisallowEdit.password ? "******" : passwordValue}
            name={"password"}
            error={formError}
            onIconClick={!isEdit ? onIconClick : ""}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isDisallowEdit.password}
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
            onClick={onIconClick}
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
