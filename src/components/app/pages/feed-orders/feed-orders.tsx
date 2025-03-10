import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders.module.css";
import test from "../../../../images/illustration.png";
import { Outlet, useLocation } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal";

export default function FeedOrders() {
  const format_date = () => {
    const date_from_server = "2022-10-10T17:33:32.877Z";
    return <FormattedDate date={new Date(date_from_server)} />;
  };
  const location = useLocation();
  const { openModal } = useModal();
  const isModal: { background: boolean } = location.state?.background;
  const isOrderDetailRoute = location.pathname.startsWith("/feed/");
  return (
    <>
      <Outlet />
      {!isOrderDetailRoute || isModal ? (
        <>
          <article className={styles.order_feed_wrapper}>
            <p className="text text_type_main-large">Лента заказов</p>
            <ul className={styles.order_items_list}>
              {[...Array(6)].map((_, i) => (
                <li
                  key={i}
                  className={styles.order_item_card}
                  onClick={() => {
                    openModal({ _id: 1 }, "order");
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
          <article className={styles.statistics_panel}>
            <section className={styles.statistics_table}>
              <div className={styles.statistics_wrapper}>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <ul className={styles.statistics_orders_list}>
                  {[...Array(10)].map((_, i) => (
                    <li key={i}>
                      <p
                        className={
                          styles.text_blue +
                          " " +
                          "text text_type_digits-default"
                        }
                      >
                        123456
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.statistics_wrapper}>
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <ul className={styles.statistics_orders_list}>
                  {[...Array(10)].map((_, i) => (
                    <li key={i}>
                      <p className="text text_type_digits-default">123456</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className={styles.statistics_counters}>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p
                className={
                  styles.digits_glow + " " + "text text_type_digits-large"
                }
              >
                123456
              </p>
            </section>
            <section className={styles.statistics_counters}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p
                className={
                  styles.digits_glow + " " + "text text_type_digits-large"
                }
              >
                123456
              </p>
            </section>
          </article>
        </>
      ) : null}
    </>
  );
}
