// import { useState } from 'react'
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ data }) {
  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
        <div className={styles.constructor_list_wrapper}>
          {data.map(
            (item) =>
              item.type !== "bun" && (
                <article key={item._id} className={styles.constructor_item_wrapper}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </article>
              )
          )
          .slice(0, 5)}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
      </div>
      <div className={styles.form_total_wrapper}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_main-large">0</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
}
