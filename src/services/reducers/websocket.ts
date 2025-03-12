import { IItemsResponse } from "../../utils/types";
import { TWebsocket, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ITEMS } from "../actions/websocket";


type WebsocketState = {
  wsConnected: boolean;
  items: IItemsResponse[];

  error?: Event;
}

const initialState: WebsocketState = {
  wsConnected: false,
  items: [],
};

export const websocket = (state = initialState, action: TWebsocket) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_ITEMS:
      return {
        ...state,
        error: undefined,
        items: [...state.items, action.payload]
      };

    default:
      return state;
  }
};