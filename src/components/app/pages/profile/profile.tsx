import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  submitGetPersonValues,
  submitLogout,
} from "../../../../services/actions/form";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { TUseFormReturn } from "../../../../utils/types";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IEdit {
  name: boolean;
  email: boolean;
  password: boolean;
}

export function Profile() {
  const {
    nameValue,
    emailValue,
    passwordValue,
    formRequest,
    formErrorStatus,
    formErrorStatusMessage,
  }: TUseFormReturn = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error Пока игнорируем redux типизацию
    dispatch(submitGetPersonValues());
  }, [dispatch]);

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });
  const [isEditable, setIsEditable] = useState<IEdit>({
    name: true,
    email: true,
    password: true,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  function onIconClick(fieldName: string): void {
    setIsEdit(true);
    setIsEditable((prev) => ({
      ...prev,
      [fieldName]: !prev,
    }));
    setIsSuccess(false);
  }

  function handleSetValue(e: ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSetUser = useCallback((): void => {
    setUser({
      name: nameValue || "Загрузка...",
      email: emailValue || "Загрузка...",
      password: "",
    });
  }, [nameValue, emailValue]);

  function resetProfileForm() {
    handleSetUser();
    setIsEditable({ name: true, email: true, password: true });
    setIsEdit(false);
  }

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(
      // @ts-expect-error Пока игнорируем redux типизацию
      submitGetPersonValues({
        name: user.name ?? nameValue,
        email: user.email ?? emailValue,
        password: user.password ?? passwordValue,
      })
    );
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    resetProfileForm();
  };

  useEffect(() => {
    handleSetUser();
  }, [handleSetUser]);
  const { name, email, password } = user;
  const isEditableEmail = isEditable.email;
  return (
    <section className={styles.profile}>
      <div className={styles.profile_navlinks}>
        <NavLink to={"/profile"} className={styles.link_button} end>
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
        <NavLink to={"/profile/orders"} className={styles.link_button} end>
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
        <Link
          to=""
          className={styles.link_button}
          onClick={() => {
            dispatch(
              // @ts-expect-error Пока игнорируем redux типизацию
              submitLogout()
            );
          }}
        >
          <p
            className={
              styles.link +
              " " +
              "text text_type_main-medium" +
              " " +
              styles.link_disabled
            }
          >
            Выход
          </p>
        </Link>
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
            onIconClick={!isEdit ? () => onIconClick("name") : undefined}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            disabled={isEditable.name}
          />
          <EmailInput
            onChange={handleSetValue}
            placeholder={"Почта"}
            isIcon={isEditableEmail}
            value={email ?? ""}
            name={"email"}
            // @ts-expect-error Разве не логично, что если есть свойство isIcon,
            // то должен быть и event на него...
            // Типизация так не считает
            onIconClick={!isEdit ? () => onIconClick("email") : undefined}
            errorText={"Email должен быть формата @domain.ru"}
            required={true}
            disabled={isEditableEmail}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={handleSetValue}
            icon={"EditIcon"}
            value={isEditable.password ? "******" : password}
            name={"password"}
            error={formErrorStatus}
            onIconClick={!isEdit ? () => onIconClick("password") : undefined}
            errorText={""}
            size={"default"}
            extraClass="ml-1"
            required={true}
            disabled={isEditable.password}
          />
          <AnimatePresence>
            {isSuccess && !formErrorStatus && (
              <motion.div key="success" exit={{ opacity: 0 }}>
                <p className="text text_type_main-small">Успешно</p>
              </motion.div>
            )}
          </AnimatePresence>
          {formErrorStatus && formErrorStatusMessage !== 403 && (
            <p className="text text_type_main-small">
              Пожалуйста, попробуйте еще раз
            </p>
          )}
          {formErrorStatusMessage === 403 && (
            <p className="text text_type_main-small">
              Этот email уже использует другой пользователь
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
