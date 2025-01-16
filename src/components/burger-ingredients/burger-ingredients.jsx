import { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/useModal";
import { IngredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import IngredientElement from "../ingredient-element/ingredient-element";

export default function BurgerIngredients() {
  // States
  const [current, setCurrent] = useState("bun");

  // Hooks
  const { isModalOpen, closeModal, openModal } = useModal();

  // Refs
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ingredients.items);

  // UseEffects
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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

  // Functions
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
      // в случае, если никакой заголовок не виден на экране, показывать последний из таба
      currentTab = tabs[tabs.length - 1];
    }

    setCurrent(currentTab.name);
  };

  // JSX
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
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
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
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
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
                <IngredientElement
                  key={item._id}
                  item={item}
                  type={item.type}
                  openModal={openModal}
                />
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
