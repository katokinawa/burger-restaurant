// import { useState } from 'react'
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ data }) {
  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_wrapper}>
        {data.map((item) => {
          return (
            <ConstructorElement
              key={item._id}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          );
        })}
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
