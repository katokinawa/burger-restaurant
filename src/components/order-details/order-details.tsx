import styles from "./order-details.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "react-redux";
import loading from "../../images/loading.gif";

export default function OrderDetails() {
  // @ts-expect-error Пока игнорируем redux типизацию
  const orderData = useSelector((state) => state.order.data);
  // @ts-expect-error Пока игнорируем redux типизацию
  const orderRequest = useSelector((state) => state.order.orderRequest);

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
            {orderData?.order?.number || "—"}
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
