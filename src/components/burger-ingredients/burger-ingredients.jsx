import { useState } from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/useModal";
import { IngredientType } from "../../utils/types";

export default function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("bun");
  const { isModalOpen, selectedIngredient, openModal, closeModal } = useModal();

  return (
    <section className={styles.burger_ingredients}>
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <a href="#bun">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce">
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={styles.ingredients_wrapper}>
        <p id="bun" className="text text_type_main-medium mb-6">
          Булки
        </p>
        <div className={styles.ingredients_list}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <article
                  key={item._id}
                  onClick={() => openModal(item)}
                  className={styles.article}
                >
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
                    <p className="text text_type_main-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                </article>
              )
          )}
        </div>
        <p id="sauce" className="text text_type_main-medium mb-6">
          Соусы
        </p>
        <div className={styles.ingredients_list}>
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <article
                  key={item._id}
                  onClick={() => openModal(item)}
                  className={styles.article}
                >
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
                    <p className="text text_type_main-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                </article>
              )
          )}
        </div>
        <p id="main" className="text text_type_main-medium mb-6">
          Начинки
        </p>
        <div className={styles.ingredients_list}>
          {data.map(
            (item) =>
              item.type === "main" && (
                <article
                  key={item._id}
                  onClick={() => openModal(item)}
                  className={styles.article}
                >
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
                    <p className="text text_type_main-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                </article>
              )
          )}
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
};
