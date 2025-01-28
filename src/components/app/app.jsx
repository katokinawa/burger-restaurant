import { AppHeader } from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "../home/home";
import styles from "./app.module.css";
import { Register } from "./pages/register/Register";
import { ForgotPassword } from "./pages/forgot-password/forgot-password";
import { ResetPassword } from "./pages/reset-password/reset-password";

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
