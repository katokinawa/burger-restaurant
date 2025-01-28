import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.nav_left}>
          <li>
            <button className={styles.button}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </button>
          </li>
          <li>
            <button className={styles.button}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </button>
          </li>
        </ul>
        <div className={styles.nav_center}>
          <Logo />
        </div>
        <ul className={styles.nav_right}>
          <li>
            <button className={styles.button}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
