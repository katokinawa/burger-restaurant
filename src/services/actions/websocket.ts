export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ITEMS: "WS_GET_ITEMS" = "WS_GET_ITEMS";
export const WS_SEND_ITEMS: "WS_SEND_ITEMS" = "WS_SEND_ITEMS";
import { getCookie } from "../../utils/getCookieValue";
import {
  AppDispatch,
  IItemsResponse,
  RootState,
  TWebsocketActions,
} from "../../utils/types";
import { Middleware, MiddlewareAPI } from "redux";

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsConnectionGetItems {
  readonly type: typeof WS_GET_ITEMS;
  readonly payload: IItemsResponse;
}

interface IWsConnectionSendItems {
  readonly type: typeof WS_SEND_ITEMS;
  readonly payload: any;
}

export type TWebsocket =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionGetItems
  | IWsConnectionSendItems;

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWebsocketActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWebsocket) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          console.log("WebSocket соединение установлено!");
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.error("Ошибка WebSocket:", event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          console.log("Получено сообщение");
          const { data } = event;
          const parsedData: IItemsResponse = JSON.parse(data);
          const { ...restParsedData } = parsedData;
          dispatch({
            type: onMessage,
            payload: { ...restParsedData },
          });
        };

        socket.onclose = (event) => {
          console.log("WebSocket соединение закрыто");
          dispatch({ type: onClose, payload: event });
          socket = null;
        };

        if (type === wsSendMessage) {
          const token = getCookie().accessToken;
          const payload = action.payload;
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
