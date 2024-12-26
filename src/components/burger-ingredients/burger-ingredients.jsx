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

export default function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("bun");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  function handleModal(item) {
    setSelectedIngredient(item);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedIngredient(null);
  }

  function getTypeLabel(type) {
    if (type === "bun") return "Булки";
    if (type === "sauce") return "Соусы";
    if (type === "main") return "Начинки";
    return null;
  }

  const renderIngredients = (type) => {
    return (
      <>
        <p className="text text_type_main-medium mb-6">{getTypeLabel(type)}</p>
        <div className={styles.ingredients_list}>
          {data.map(
            (item) =>
              item.type === type && (
                <article
                  key={item._id}
                  onClick={() => handleModal(item)}
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
                  />
                  <div className={styles.price_wrapper}>
                    <p className="text text_type_main-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">{item.name}</p>
                </article>
              )
          )}
        </div>
      </>
    );
  };

  const renderOtherIngredients = (type) => {
    if (current === type) return null;

    return (
      <>
        <p className="text text_type_main-medium mb-6">{getTypeLabel(type)}</p>
        <div className={styles.ingredients_list}>
          {data.map(
            (item) =>
              item.type === type && (
                <article
                  key={item._id}
                  onClick={() => handleModal(item)}
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
      </>
    );
  };

  return (
    <section className={styles.burger_ingredients}>
      <Modal isModalOpen={isModalOpen} handleClose={handleCloseModal}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      <p className="text text_type_main-large mb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients_wrapper}>
        {renderIngredients(current)}
        {renderOtherIngredients("bun")}
        {renderOtherIngredients("sauce")}
        {renderOtherIngredients("main")}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};
