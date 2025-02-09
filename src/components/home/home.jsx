import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Outlet />
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </>
  );
}
