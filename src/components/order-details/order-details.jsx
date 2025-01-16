import styles from "./order-details.module.css";
import doneImage from "../../images/done.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  // Redux
  const orderData = useSelector((state) => state.order.data);

  // JSX
  return (
    <div className={styles.order_details_wrapper}>
      <p className={styles.heading + " text text_type_digits-large mb-8"}>
        {orderData?.order?.number}
      </p>
      <p className="text text_type_main-default mb-15">идентификатор заказа</p>
      <img className="mb-15" src={doneImage} />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
};
