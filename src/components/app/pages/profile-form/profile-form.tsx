import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import { useForm } from "../../../../hooks/useForm";

import { submitGetPersonValues } from "../../../../services/actions/form";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { IUser, TUseFormReturn } from "../../../../utils/types";
import { useDispatch } from "../../../../utils/reduxCustomBoilerplate";
interface IEdit {
  name: boolean;
  email: boolean;
  password: boolean;
}

export function ProfileForm() {
  const {
    nameValue,
    emailValue,
    passwordValue,
    formRequest,
    formErrorStatus,
    formErrorStatusCode,
  }: TUseFormReturn = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
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
    const personValues = {
      name: user.name ?? nameValue,
      email: user.email ?? emailValue,
      password: user.password ?? passwordValue,
    };
    dispatch(submitGetPersonValues(personValues));
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
    <>
      <form className={styles.profile_form} onSubmit={onSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleSetValue}
          icon={"EditIcon"}
          value={name ?? ""}
          name={"name"}
          error={formErrorStatus}
          onIconClick={!isEdit ? () => onIconClick("name") : undefined}
          errorText={""}
          size={"default"}
          extraClass="ml-1"
          disabled={isEditable.name}
          required={true}
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
          disabled={isEditableEmail}
          required={true}
        />
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={handleSetValue}
          icon={"EditIcon"}
          value={isEditable.password ? "******" : password ?? ""}
          name={"password"}
          error={formErrorStatus}
          onIconClick={!isEdit ? () => onIconClick("password") : undefined}
          errorText={""}
          size={"default"}
          extraClass="ml-1"
          disabled={isEditable.password}
          required={true}
        />

        <div className={styles.action_wrapper}>
          <AnimatePresence>
            {isSuccess && !formErrorStatus && (
              <motion.div key="success" exit={{ opacity: 0 }}>
                <p className="text text_type_main-small">Успешно</p>
              </motion.div>
            )}
          </AnimatePresence>
          {formErrorStatus && formErrorStatusCode !== 403 && (
            <p className="text text_type_main-small">
              Пожалуйста, попробуйте еще раз
            </p>
          )}
          {formErrorStatusCode === 403 && (
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
        </div>
      </form>
    </>
  );
}
