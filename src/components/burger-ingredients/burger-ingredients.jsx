import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function BurgerIngredients({ data, isModalOpen, handleModal }) {
  const [current, setCurrent] = useState("Булки");
  return (
    <section className={styles.burger_ingredients}>
      <Modal isModalOpen={isModalOpen} handleClose={handleModal}>
        <IngredientDetails />
      </Modal>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients_wrapper}>
        {current === "Булки" ? (
          <>
            <p className="text text_type_main-medium mb-6">Булки</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "bun" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        ) : current === "Соусы" ? (
          <>
            <p className="text text_type_main-medium mb-6">Соусы</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "sauce" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        ) : current === "Начинки" ? (
          <>
            <p className="text text_type_main-medium mb-6">Начинки</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "main" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        ) : null}
        {current === "Булки" ? null : (
          <>
            <p className="text text_type_main-medium mb-6">Булки</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "bun" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        )}
        {current === "Соусы" ? null : (
          <>
            <p className="text text_type_main-medium mb-6">Соусы</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "sauce" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        )}
        {current === "Начинки" ? null : (
          <>
            <p className="text text_type_main-medium mb-6">Начинки</p>
            <div className={styles.ingredients_list}>
              {data.map(
                (item) =>
                  item.type === "main" && (
                    <article key={item._id} className={styles.article}>
                      <Counter
                        count={1}
                        size="default"
                        extraClass="m-1"
                        className={styles.counter}
                      />
                      <img
                        className={styles.img}
                        src={item.image_large}
                        alt={item.name}
                      ></img>
                      <div className={styles.price_wrapper}>
                        <p className="text text_type_main-default">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className="text text_type_main-default">{item.name}</p>
                    </article>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
