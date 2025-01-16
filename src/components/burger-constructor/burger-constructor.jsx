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
import {
  ADD_BURGER_BUN,
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  SWAP_BURGER_INGREDIENT,
} from "../../services/actions/burger-constructor";
import cloudIcon from "../../images/cloud.svg";
import { postOrder } from "../../services/actions/order-detail";

export default function BurgerConstructor() {
  // Hooks
  const { isModalOpen, openModal, closeModal } = useModal();

  // Redux
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.burger_constructor.items);
  const bun = useSelector((state) => state.burger_constructor.bun);

  // Consts
  const sum =
    ingredients.reduce((sum, { price }) => sum + price, 0) +
    bun.reduce((sum, { price }) => sum + price * 2, 0);

  const bunItem = bun[0];

  // Functions
  const collectArrayId = () => {
    const arr = [
      ...ingredients.map((item) => item._id),
      ...bun.map((item) => item._id),
    ];
    return { ingredients: arr };
  };

  const handlePostOrder = () => {
    dispatch(postOrder(collectArrayId()));
  };

  const handleMoveItem = (dragItemIndex, dropItemIndex) => {
    const updatedIngredients = [...ingredients];
    let temp = updatedIngredients[dropItemIndex];
    updatedIngredients[dropItemIndex] = updatedIngredients[dragItemIndex];
    updatedIngredients[dragItemIndex] = temp;
    handleSwapBurgerIngredient(updatedIngredients);
  };

  const handleDeleteItem = (index) => {
    const deleteIngredient = [...ingredients];
    deleteIngredient.splice(index, 1);
    handleDeleteIngredient(deleteIngredient);
  };

  const handleDeleteIngredient = (item) => {
    dispatch({
      type: DELETE_BURGER_INGREDIENT,
      item,
    });
  };

  const handleSwapBurgerIngredient = (item) => {
    dispatch({
      type: SWAP_BURGER_INGREDIENT,
      item,
    });
  };

  const handleDropBun = (item) => {
    dispatch({
      type: ADD_BURGER_BUN,
      item,
    });
  };

  const handleDrop = (item) => {
    dispatch({
      type: ADD_BURGER_INGREDIENT,
      item,
    });
  };

  // DND (drag and drop)
  const [, dropTargetBunsTop] = useDrop({
    accept: "bun",
    drop(item) {
      handleDropBun(item);
    },
  });
  const [, dropTargetBunsBottom] = useDrop({
    accept: "bun",
    drop(item) {
      handleDropBun(item);
    },
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
  });

  // JSX
  return (
    <section className={styles.burger_constructor}>
      <Modal isModalOpen={isModalOpen} handleClose={closeModal}>
        <OrderDetails />
      </Modal>
      <div ref={dropTargetBunsTop} className={styles.constructor_bun_wrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bunItem.name + " (верх)"}
          price={bunItem.price}
          thumbnail={bunItem.image}
        />
      </div>
      {ingredients.length === 0 ? (
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
          <div className={styles.constructor_list_wrapper}>
            {ingredients.map(
              (item, index) =>
                item.type !== "bun" && (
                  <BurgerConstructorElement
                    key={index}
                    item={item}
                    index={index}
                    moveItem={handleMoveItem}
                    deleteItem={handleDeleteItem}
                  />
                )
            )}
          </div>
        </div>
      )}
      <div
        ref={dropTargetBunsBottom}
        className={styles.constructor_bun_wrapper}
      >
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bunItem.name + " (низ)"}
          price={bunItem.price}
          thumbnail={bunItem.image}
        />
      </div>

      <div className={styles.form_total_wrapper}>
        <div className={styles.price_wrapper}>
          <p className="text text_type_main-large">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={(e) => {
            handlePostOrder();
            openModal(e);
          }}
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
