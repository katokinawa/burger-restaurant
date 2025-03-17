import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-current.module.css";
import { useDispatch, useSelector } from "../../utils/reduxCustomBoilerplate";
import { getOrder } from "../../services/actions/ingredient-detail";
import { useEffect } from "react";

export const OrderCurrent = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.ingredient.data);
  const order_number = useSelector((state) => state.ingredient.data?.number);
  const ingredients = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (Object.keys(order).length && order_number) {
      localStorage.setItem("order", JSON.stringify(order_number));
    }
  }, [order, order_number]);

  useEffect(() => {
    if (!Object.keys(order).length) {
      const order = localStorage.getItem("order");
      if (order) {
        dispatch(getOrder(+order));
      }
    }
  }, [order, dispatch]);

  if (!order || !order.ingredients) return null;

  const ingredientCount = order.ingredients.reduce(
    (acc: { [key: string]: number }, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {}
  );

  const uniqueIngredients = Object.keys(ingredientCount)
    .map((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      return ingredient ? { ...ingredient, count: ingredientCount[id] } : null;
    })
    .filter(Boolean);

  const totalPrice = uniqueIngredients.reduce(
    (sum, item) => sum + (item ? item.price * (item ? item.count : 0) : 0),
    0
  );

  const statusOrder = () => {
    switch (order.status) {
      case "done": {
        return "Выполнен";
      }
      case "cancel": {
        return "Отменён";
      }
      case "pending": {
        return "Создан";
      }
      default: {
        return "Статус неизвестен";
      }
    }
  };
  return (
    <section className={styles.order_current}>
      <div className={styles.order_current_center}>
        <p className="text text_type_digits-default mb-10">#{order.number}</p>
      </div>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p
        className={`${styles.order_current_status} text text_type_main-default mb-15`}
      >
        {statusOrder()}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.order_items_list}>
        {uniqueIngredients.map((ingredient) => {
          if (!ingredient) return null;
          return (
            <li key={ingredient._id} className={styles.order_item_card}>
              <div className={styles.order_item_wrapper}>
                <div className={styles.order_ingredient_icon_wrapper}>
                  <div className={styles.order_ingredient_icon_wrapper_black}>
                    {" "}
                    <img
                      className={styles.order_ingredient_icon_image}
                      src={ingredient.image}
                      alt={ingredient.name}
                    />
                  </div>
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
                <div className={styles.order_price_wrapper}>
                  <p className="text text_type_main-medium">
                    {ingredient.count}× {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.order_current_modal_footer}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate
            date={
              order && order.createdAt
                ? new Date(order.createdAt)
                : new Date("Неизвестно")
            }
          />
        </p>
        <div className={styles.order_price_wrapper}>
          <p className="text text_type_main-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};
