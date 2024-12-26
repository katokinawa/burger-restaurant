import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ ingredient }) {
  if (!ingredient) return null;
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
              {ingredient.carbohydrates}
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
  ingredient: PropTypes.array,
};
