import {
  ORDER_SET_INITIAL_STATE,
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESSFUL,
} from "../actions/order-detail";

const initialState = {
  data: [],
  orderRequest: false,
  orderFailed: false,
};

export const orderDetail = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESSFUL: {
      return {
        ...state,
        data: action.item,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case ORDER_SET_INITIAL_STATE: {
      return {
        ...state,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};
