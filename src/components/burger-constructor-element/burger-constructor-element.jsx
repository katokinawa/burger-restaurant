import styles from "./burger-constructor-element.module.css";
import { IngredientType } from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";

export default function BurgerConstructorElement({ item, index, moveItem }) {
  // DND (drag and drop)
  const [, dropItemTarget] = useDrop({
    accept: "ingredientItem",
    drop(draggedItem) {
      moveItem(draggedItem.index, index);
    },
  });
  const [, dragItemTarget] = useDrag({
    type: "ingredientItem",
    item: {
      item: item,
      index: index,
    },
  });

  // JSX
  return (
    <article ref={dropItemTarget}>
      <div ref={dragItemTarget} className={styles.constructor_item_wrapper}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </div>
    </article>
  );
}

BurgerConstructorElement.propTypes = {
  item: IngredientType,
  index: PropTypes.number,
  moveItem: PropTypes.func,
};
