import { Navigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { submitGetPersonValues } from "../services/actions/form";
import { getCookie } from "../utils/getCookieValue";

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();
  const token = getCookie().refreshToken;

  const init = useCallback(() => {
    if (token) {
      dispatch(submitGetPersonValues());
    }
  }, [dispatch, token]);

  useEffect(() => {
    init();
  }, [init]);

  if (token) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};
