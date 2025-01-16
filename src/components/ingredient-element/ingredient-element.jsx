import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-element.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/types";
import { useDrag } from "react-dnd";
export default function IngredientElement({ item, openModal, type }) {
  // DND (drag and drop)
  const [, dragTarget] = useDrag({
    type: type === 'bun' ? 'bun' : 'ingredient',
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
      <Counter
        count={1}
        size="default"
        extraClass="m-1"
        className={styles.counter}
      />
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
