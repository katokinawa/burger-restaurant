import styles from "./ingredient-details.module.css";
import { IngredientType } from "../../utils/types";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  // Redux
  const ingredient = useSelector((state) => state.ingredient.data);

  // JSX
  return (
    <div className={styles.ingredients_modal_wrapper}>
      <p className={styles.heading + " text text_type_main-large"}>
        Детали ингредиента
      </p>
      <div className={styles.ingredients_details_wrapper}>
        <img className="mb-4" src={ingredient.image_large} />
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <ul className={styles.energy_value_list}>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
          <li className={styles.energy_value_item}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
            <p className="text text_type_main-default text_color_inactive"></p>
          </li>
        </ul>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: IngredientType,
};
