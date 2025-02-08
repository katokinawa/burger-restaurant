import { Navigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { submitGetPersonValues } from "../services/actions/form";
import { getCookie } from "../utils/getCookieValue";
import PropTypes from "prop-types";

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
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};
