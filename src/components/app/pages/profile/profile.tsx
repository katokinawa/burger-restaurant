import styles from "./profile.module.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { submitLogout } from "../../../../services/actions/form";
import { useDispatch } from "../../../../utils/reduxCustomBoilerplate";

export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background ?? false;
  const isOrderDetailRoute = location.pathname.startsWith("/profile/orders/");

  const currentLocation = () => {
    switch (location.pathname) {
      case "/profile":
        return (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        );
      case "/profile/orders":
        return (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <section className={styles.profile}>
        {!isOrderDetailRoute || isModal ? (
          <div className={styles.profile_navlinks}>
            <NavLink to={"/profile"} className={styles.link_button} end>
              {({ isActive }) => (
                <p
                  className={
                    styles.link +
                    ` text text_type_main-medium ${
                      !isActive && styles.link_disabled
                    }`
                  }
                >
                  Профиль
                </p>
              )}
            </NavLink>
            <NavLink to={"/profile/orders"} className={styles.link_button} end>
              {({ isActive }) => (
                <p
                  className={
                    styles.link +
                    ` text text_type_main-medium ${
                      !isActive && styles.link_disabled
                    }`
                  }
                >
                  История заказов
                </p>
              )}
            </NavLink>
            <Link
              to=""
              className={styles.link_button}
              onClick={() => {
                dispatch(submitLogout());
              }}
            >
              <p
                className={
                  styles.link +
                  " " +
                  "text text_type_main-medium" +
                  " " +
                  styles.link_disabled
                }
              >
                Выход
              </p>
            </Link>
            {currentLocation()}
          </div>
        ) : null}
        <div className={styles.profile_inputs_wrapper}>
          <Outlet />
        </div>
      </section>
    </>
  );
}
