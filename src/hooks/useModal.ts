import {
  CLEAR_INGREDIENT_DATA,
  DELETE_SELECTED_INGREDIENT,
  SET_SELECTED_INGREDIENT,
} from "../services/actions/ingredient-detail";
import { ORDER_SET_INITIAL_STATE } from "../services/actions/order-detail";
import { useNavigate } from "react-router-dom";
import { IItem, TItemsResponseOrders } from "../utils/types";
import { useDispatch } from "../utils/reduxCustomBoilerplate";

export const useModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = (
    item: IItem | TItemsResponseOrders,
    ingredientType: string
  ): void => {
    dispatch({
      type: SET_SELECTED_INGREDIENT,
      item,
      ingredientType,
    });
    switch (ingredientType) {
      case "ingredient": {
        navigate(`/ingredient/${item._id}`, { state: { background: true } });
        break;
      }
      case "postorder": {
        navigate("/order");
        break;
      }
      case "order": {
        navigate(`/feed/${item._id}`, { state: { background: true } });
        break;
      }
      case "profile-order": {
        navigate(`/profile/orders/${item._id}`, { state: { background: true } });
        break;
      }
      default:
        navigate("/");
    }
  };

  const closeModal = () => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_INGREDIENT_DATA });
    }, 300);
    dispatch({
      type: ORDER_SET_INITIAL_STATE,
    });
    navigate(-1);
  };

  return {
    openModal,
    closeModal,
  };
};
