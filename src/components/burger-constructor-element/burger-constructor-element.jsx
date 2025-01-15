import styles from "./burger-constructor-element.module.css";
import { IngredientType } from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

export default function BurgerConstructorElement({ item, index }) {
  const [{ isDrag }, dragItemTarget] = useDrag({
    type: "ingredientItem",
    item: {
      item: item,
      index: index,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  // JSX
  return (
    !isDrag && (
      <article ref={dragItemTarget} className={styles.constructor_item_wrapper}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </article>
    )
  );
}

BurgerConstructorElement.propTypes = {
  item: IngredientType,
  index: PropTypes.number
};
