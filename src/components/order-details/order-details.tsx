import styles from "./order-details.module.css";
import doneImage from "../../images/done.svg";

import loading from "../../images/loading.gif";
import { getCookie } from "../../utils/getCookieValue";
import { useSelector } from "../../utils/reduxCustomBoilerplate";

export default function OrderDetails() {
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderNumber = getCookie().orderNumber;

  return (
    <div className={styles.order_details_wrapper}>
      {orderRequest ? (
        <img
          src={loading}
          className={styles.loading_gif}
          alt="Иконка загрузки"
        />
      ) : (
        <>
          <p className={styles.heading + " text text_type_digits-large mb-8"}>
            {orderNumber || "—"}
          </p>
          <p className="text text_type_main-default mb-15">
            идентификатор заказа
          </p>
          <img className="mb-15" src={doneImage} alt="Галочка в облаке" />
          <p className="text text_type_main-small mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}
