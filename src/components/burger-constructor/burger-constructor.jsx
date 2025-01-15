import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../hooks/useModal";
import { IngredientType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { ADD_BURGER_INGREDIENT } from "../../services/actions/burger-constructor";
import cloudIcon from "../../images/cloud.svg";

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
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
  });

  const [, dropItemTarget] = useDrop({
    accept: "ingredientItem",
    drop(item) {
      // handleDrop(item);
    },
  });

  // JSX
  return (
    <section className={styles.burger_constructor}>
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <OrderDetails />
      </Modal>
      <div className={styles.constructor_bun_wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
      </div>
      {data.length === 0 ? (
        <div ref={dropTarget} className={styles.constructor_wrapper_hover}>
          <div className={styles.dnd_wrapper}>
            <img src={cloudIcon} />
            <p className="text text_type_main-medium mb-6">
              Drag and drop the ingredients here
            </p>
          </div>
        </div>
      ) : (
        <div ref={dropTarget} className={styles.constructor_wrapper}>
          <div ref={dropItemTarget} className={styles.constructor_list_wrapper}>
            {data.map(
              (item, index) =>
                item.type !== "bun" && (
                  <BurgerConstructorElement key={index} item={item} index={index} />
                )
            )}
          </div>
        </div>
      )}
      <div className={styles.constructor_bun_wrapper}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={
            data.find((item) => item.name === "Краторная булка N-200i")?.price
          }
          thumbnail={
            data.find((item) => item.name === "Краторная булка N-200i")?.image
          }
        />
      </div>

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
