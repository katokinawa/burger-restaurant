import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export function Profile() {
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

  function onIconClick() {
    // dispatch({
    //     type:
    // })
  }

  return (
    <section className={styles.profile}>
      <div className={styles.profile_navlinks}>
        <NavLink to={"/profile"} className={styles.link_button}>
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "text text_type_main-medium" + " " + styles.linkActive
                  : "text text_type_main-medium" + " " + styles.link
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
                isActive
                  ? "text text_type_main-medium" + " " + styles.linkActive
                  : "text text_type_main-medium" + " " + styles.link
              }
            >
              История заказов
            </p>
          )}
        </NavLink>
        <NavLink to={`/profile/orders/:number`} className={styles.link_button}>
          {({ isActive }) => (
            <p
              className={
                isActive
                  ? "text text_type_main-medium" + " " + styles.linkActive
                  : "text text_type_main-medium" + " " + styles.link
              }
            >
              Выход
            </p>
          )}
        </NavLink>
      </div>
      <div className={styles.profile_inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onFormChange}
          icon={"CurrencyIcon"}
          value={nameValue}
          name={"name"}
          error={formError}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          disabled={true}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={onFormChange}
          icon={"CurrencyIcon"}
          value={emailValue}
          name={"name"}
          error={formError}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          disabled={true}
        />
        <Input
          type={passwordVisible ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={"CurrencyIcon"}
          value={passwordValue}
          name={"name"}
          error={formError}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          disabled={true}
        />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass="ml-2"
          disabled={formRequest}
        >
          Сохранить
        </Button>
      </div>
    </section>
  );
}
