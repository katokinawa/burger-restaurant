import { AppHeader } from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "../home/home";
import styles from "./app.module.css";

export default function App() {
  // JSX
  return (
    <BrowserRouter>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
