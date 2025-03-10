import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orders.module.css";
import test from "../../../../images/illustration.png";
import { useModal } from "../../../../hooks/useModal";
import { Outlet } from "react-router-dom";

export default function Orders() {
  const format_date = () => {
    const date_from_server = "2022-10-10T17:33:32.877Z";
    return <FormattedDate date={new Date(date_from_server)} />;
  };
  const { openModal } = useModal();

  return (
    <>
      <Outlet />
      <article className={styles.order_feed_wrapper}>
        <ul className={styles.order_items_list}>
          {[...Array(6)].map((_, i) => (
            <li
              key={i}
              className={styles.order_item_card}
              onClick={() => {
                openModal({ _id: 1 }, "profile-order");
              }}
            >
              <div className={styles.order_item_header}>
                <p className="text text_type_digits-default">#123456</p>
                <p className="text text_type_main-default text_color_inactive">
                  {format_date()}
                </p>
              </div>
              <p className="text text_type_main-medium">Бургер</p>
              <div className={styles.order_item_header}>
                <div className={styles.order_ingredients_wrapper}>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={styles.order_ingredient_icon_wrapper}
                    >
                      <img
                        className={styles.order_ingredient_icon_image}
                        src={test}
                        alt="Ингредиент"
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.order_price_wrapper}>
                  <p className="text text_type_main-medium">0</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
