import styles from "./burger-constructor-element.module.css";
import { IngredientType } from "../../utils/types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructorElement({ item }) {
  return (
    <article className={styles.constructor_item_wrapper}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </article>
  );
}

BurgerConstructorElement.propTypes = {
  item: IngredientType,
};
