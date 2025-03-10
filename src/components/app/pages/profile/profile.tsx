import styles from "./profile.module.css";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { submitLogout } from "../../../../services/actions/form";
import { useDispatch } from "../../../../utils/reduxCustomBoilerplate";

export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isModal: { background: boolean } = location.state?.background;
  const isOrderDetailRoute = location.pathname.startsWith("/profile/orders/");
  return (
    <>
      {!isOrderDetailRoute || isModal ? (
        <section className={styles.profile}>
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
            <p className="text text_type_main-default text_color_inactive mt-20">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={styles.profile_inputs_wrapper}>
            <Outlet />
          </div>
        </section>
      ) : null}
    </>
  );
}
