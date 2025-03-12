import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders.module.css";
import test from "../../../../images/illustration.png";
import { Outlet, useLocation } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal";
import {
  useDispatch,
  useSelector,
} from "../../../../utils/reduxCustomBoilerplate";
import { WS_CONNECTION_START } from "../../../../services/actions/websocket";
import { useEffect } from "react";

export default function FeedOrders() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.websocket);
  const format_date = () => {
    const date_from_server = "2022-10-10T17:33:32.877Z";
    return <FormattedDate date={new Date(date_from_server)} />;
  };
  const location = useLocation();
  const { openModal } = useModal();
  const isModal: { background: boolean } = location.state?.background;
  const isOrderDetailRoute = location.pathname.startsWith("/feed/");

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log(items);
  return (
    <>
      <Outlet />
      {!isOrderDetailRoute || isModal ? (
        <>
          <article className={styles.order_feed_wrapper}>
            <p className="text text_type_main-large">Лента заказов</p>
            <ul className={styles.order_items_list}>
              {items.map((_, i) => (
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
                  {items
                    .flatMap((current) => current.orders)
                    .slice(0, 10)
                    .map((current, i) => {
                      if (current.status === "done") {
                        return (
                          <li key={i}>
                            <p
                              className={
                                styles.text_blue +
                                " " +
                                "text text_type_digits-default"
                              }
                            >
                              {current.number}
                            </p>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
              <div className={styles.statistics_wrapper}>
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <ul className={styles.statistics_orders_list}>
                  {items
                    .flatMap((current) => current.orders)
                    .slice(0, 10)
                    .map((current, i) => {
                      return (
                        <li key={i}>
                          <p className="text text_type_digits-default">
                            {current.number}
                          </p>
                        </li>
                      );
                    })}
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
              >{items[0]?.total}</p>
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
                {items[0]?.totalToday}
              </p>
            </section>
          </article>
        </>
      ) : null}
    </>
  );
}
