import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-element.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { IItem } from "../../utils/types";
export default function IngredientElement({
  item,
  openModal,
  type,
}: {
  item: IItem;
  openModal: (item: IItem, ingredientType: string) => void;
  type: string;
}) {
  // @ts-expect-error Пока игнорируем redux типизацию
  const ingredients = useSelector((state) => state.burger_constructor.items);
  // @ts-expect-error Пока игнорируем redux типизацию
  const counterBuns = useSelector((state) => state.burger_constructor.bun);

  const countIngredient = ingredients.filter((e: IItem) => e._id === item._id);
  const countBuns = counterBuns.filter((e: IItem) => e._id === item._id);

  // DND (drag and drop)
  const [, dragTarget] = useDrag({
    type: type === "bun" ? "bun" : "ingredient",
    item: item,
  });

  return (
    <article
      onClick={() => {
        openModal(item, "ingredient");
      }}
      className={styles.article}
      ref={dragTarget}
    >
      {countIngredient.length !== 0 && (
        <Counter
          count={countIngredient.length}
          size="default"
          extraClass="m-1"
        />
      )}
      {countBuns.length !== 0 && (
        <Counter count={countBuns.length + 1} size="default" extraClass="m-1" />
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
