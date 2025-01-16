import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  SWAP_BURGER_INGREDIENT,
  ADD_BURGER_BUN,
} from "../actions/burger-constructor";

const initialState = {
  items: [],
  bun: [
    {
      _id: "643d69a5c3f7b9001cfa093d",
      name: "Флюоресцентная булка R2-D3",
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
    },
  ],
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_BUN: {
      return {
        ...state,
        bun: [action.item],
      };
    }
    case SWAP_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    case ADD_BURGER_INGREDIENT: {
      return {
        ...state,
        items: [...state.items, action.item],
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        items: action.item,
      };
    }
    default: {
      return state;
    }
  }
};
