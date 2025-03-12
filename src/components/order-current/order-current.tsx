import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import test from "../../images/illustration.png";
import styles from "./order-current.module.css";

export default function OrderCurrent() {
  const format_date = () => {
    const date_from_server = "2022-10-10T17:33:32.877Z";
    return <FormattedDate date={new Date(date_from_server)} />;
  };
  return (
    <>
      <section className={styles.order_current}>
        <div className={styles.order_current_center}>
          <p className="text text_type_digits-default mb-10">#034533</p>
        </div>
        <p className="text text_type_main-medium mb-3">
          Black Hole Singularity острый бургер
        </p>
        <p
          className={
            styles.order_current_status +
            " " +
            "text text_type_main-default mb-15"
          }
        >
          Выполнен
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <ul className={styles.order_items_list}>
          {[...Array(5)].map((_, i) => (
            <li key={i} className={styles.order_item_card}>
              <div className={styles.order_item_wrapper}>
                <div key={i} className={styles.order_ingredient_icon_wrapper}>
                  <img
                    className={styles.order_ingredient_icon_image}
                    src={test}
                    alt="Ингредиент"
                  />
                </div>
                <p
                  className={
                    styles.order_ingredient_text +
                    " " +
                    "text text_type_main-default"
                  }
                >
                  Булочка
                </p>
                <div className={styles.order_price_wrapper}>
                  <p className="text text_type_main-medium">1х + 80</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.order_current_modal_footer}>
          <p className="text text_type_main-default text_color_inactive">
            {format_date()}
          </p>
          <div className={styles.order_price_wrapper}>
            <p className="text text_type_main-medium">80</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
