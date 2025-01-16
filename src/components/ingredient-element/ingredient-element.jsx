import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-element.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
export default function IngredientElement({ item, openModal, type }) {
  // Redux
  const ingredients = useSelector((state) => state.burger_constructor.items);
  const counterBuns = useSelector((state) => state.burger_constructor.bun);

  // Consts
  const countIngredient = ingredients.filter((e) => e._id === item._id);
  const countBuns = counterBuns.filter((e) => e._id === item._id);

  // DND (drag and drop)
  const [, dragTarget] = useDrag({
    type: type === "bun" ? "bun" : "ingredient",
    item: item,
  });

  // JSX
  return (
    <article
      onClick={() => {
        openModal(item);
      }}
      className={styles.article}
      ref={dragTarget}
    >
      {countIngredient.length !== 0 && (
        <Counter
          count={countIngredient.length}
          size="default"
          extraClass="m-1"
          className={styles.counter}
        />
      )}
      {countBuns.length !== 0 && (
        <Counter
          count={countBuns.length + 1}
          size="default"
          extraClass="m-1"
          className={styles.counter}
        />
      )}
      <img className={styles.img} src={item.image_large} alt={item.name}></img>
      <div className={styles.price_wrapper}>
        <p className="text text_type_main-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </article>
  );
}

IngredientElement.propTypes = {
  item: IngredientType,
  openModal: PropTypes.func,
  type: PropTypes.string,
};
