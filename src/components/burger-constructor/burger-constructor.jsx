import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/useModal";
import { IngredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { ADD_BURGER_INGREDIENT } from "../../services/actions/burger-constructor";

export default function BurgerConstructor() {
  // Hooks
  const { isModalOpen, openModal, closeModal } = useModal();

  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.burger_constructor.items);

  // Functions
  const handleDrop = (item) => {
    dispatch({
      type: ADD_BURGER_INGREDIENT,
      item,
    });
  };

  // DND (drag and drop)
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const hover = isHover ? (
    <div ref={dropTarget} className={styles.constructor_wrapper}>
      <div className={styles.dnd_wrapper}>
        <p>Drag and drop file here</p>
      </div>
    </div>

  ) : (
    <div ref={dropTarget} className={styles.constructor_wrapper}>
      <div className={styles.constructor_list_wrapper}>
        {data
          .map(
            (item) =>
              item.type !== "bun" && (
                <BurgerConstructorElement key={item._id} item={item} />
              )
          )
          .slice(0, 6)}
      </div>
    </div>
  );
  // JSX
  return (
    <section className={styles.burger_constructor}>
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <OrderDetails />
      </Modal>
      {hover}
      <div className={styles.form_total_wrapper}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_main-large">0</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(IngredientType),
};
