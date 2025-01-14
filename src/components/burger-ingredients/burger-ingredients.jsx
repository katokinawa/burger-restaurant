import { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

export default function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleScroll = () => {
    if (
      !containerRef.current ||
      !bunRef.current ||
      !sauceRef.current ||
      !mainRef.current
    )
      return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    const bunTop = bunRef.current.getBoundingClientRect().top - containerTop;
    const sauceTop =
      sauceRef.current.getBoundingClientRect().top - containerTop;
    const mainTop = mainRef.current.getBoundingClientRect().top - containerTop;

    const tabs = [
      { name: "bun", position: bunTop },
      { name: "sauce", position: sauceTop },
      { name: "main", position: mainTop },
    ];

    const visibleTabs = tabs.filter((tab) => tab.position >= 0);

    let currentTab;
    if (visibleTabs.length > 0) {
      currentTab = tabs.find((item) => item.position >= 0);
    } else {
      // в случае, если никакой заголовок не виден на экране, показывать последний из списка
      currentTab = tabs[tabs.length - 1];
    }

    setCurrent(currentTab.name);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <IngredientDetails />
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
      <div ref={containerRef} className={styles.ingredients_wrapper}>
        <p id="bun" ref={bunRef} className="text text_type_main-medium mb-6">
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
        <p
          id="sauce"
          ref={sauceRef}
          className="text text_type_main-medium mb-6"
        >
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
        <p id="main" ref={mainRef} className="text text_type_main-medium mb-6">
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
