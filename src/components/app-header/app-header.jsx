// import { useState } from 'react'
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  return (
    <section className={styles.header}>
      <button className={styles.button}>
        <BurgerIcon type="primary" />
        <p className={styles.text}>Конструктор</p>
      </button>
      <button className={styles.button}>
        <ListIcon type="primary" />
        <p className={styles.text}>Лента заказов</p>
      </button>
      <button className={styles.button}>
        <ProfileIcon type="primary" />
        <p className={styles.text}>Личный кабинет</p>
      </button>
    </section>
  );
}
