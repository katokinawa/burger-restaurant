import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useCallback, useEffect } from "react";

import { submitGetPersonValues } from "../services/actions/form";
import { getCookie } from "../utils/getCookieValue";
import { useDispatch } from "../utils/reduxCustomBoilerplate";

export const ProtectedRouteElement = ({
  element,
  anonymous = false,
}: {
  element: ReactNode;
  anonymous?: boolean;
}) => {
  const dispatch = useDispatch();
  const token = getCookie().refreshToken;
  const location = useLocation();
  const from = location.state && location.state.from || "/";

  const init = useCallback(() => {
    if (token) {
      dispatch(submitGetPersonValues());
    }
  }, [dispatch, token]);

  useEffect(() => {
    init();
  }, [init]);

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && token) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !token) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return element;
};
