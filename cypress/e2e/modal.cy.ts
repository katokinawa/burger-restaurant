import { testUrl } from "../../src/utils/constants";

const OPEN_MODAL_BUTTON = ".open-modal-button";
const MODAL_WINDOW = '[data-testid="modal-window"]';

const handleDrapAndDropItem = (item: string, itemName: string) => {
  // берем ингредиент и бросаем в конструктор
  cy.get("@ingredients-elements-block")
    .find('[data-testid="ingredient"]')
    .contains(itemName)
    .as("ingredient-drag"); // берём замоканый ингредиент и присваеваем ей имя

  cy.get("@ingredient-drag").trigger("dragstart").wait(500); // ждём, чтобы не было багов;
  cy.get(`@сonstructor-ingredients-block-${item}`).trigger("drop").wait(500); // ждём, чтобы не было багов;

  cy.get(`[data-testid="${item}-constructor-element"]`).eq(0).should("exist");
};

describe("Проверка логики работы модального окна", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredient" }).as(
      "getIngredients"
    ); // мокаем запрос ингредиентов
    cy.visit(testUrl);
    cy.viewport("macbook-11"); // для удобства
  });

  it("Должно открыться по клику", () => {
    cy.get(OPEN_MODAL_BUTTON).contains("Булка").click();
    cy.get(MODAL_WINDOW).should("exist").wait(500);
  });

  it("Должно открыться по клику оформить заказ", () => {
    // Устанавливаем refreshToken в куки
    cy.setCookie("refreshToken", "lol");

    cy.get('[data-testid="ingredients-elements-block"]').as(
      "ingredients-elements-block"
    ); // блок с ингредиентами
    cy.get('[data-testid="сonstructor-ingredients-block-bun"]').as(
      "сonstructor-ingredients-block-bun"
    ); // блок конструктором булок

    cy.get('[data-testid="сonstructor-ingredients-block-ingredient"]').as(
      "сonstructor-ingredients-block-ingredient"
    ); // блок с конструктором ингредиентов

    handleDrapAndDropItem("bun", "Булка");

    handleDrapAndDropItem("ingredient", "Соус");

    // теперь кликаем по кнопке оформить заказ
    cy.get(OPEN_MODAL_BUTTON).contains("Оформить заказ").click();
    cy.get(MODAL_WINDOW).should("exist");
  });

  it("Должно закрыться по крестику", () => {
    cy.get(OPEN_MODAL_BUTTON).contains("Булка").click();
    cy.get('[data-testid="close-button"]').click();
    cy.get(MODAL_WINDOW).should("not.exist");
  });

  it("Должно закрыться по клику на оверлей", () => {
    cy.get(OPEN_MODAL_BUTTON).contains("Булка").click();
    cy.get(MODAL_WINDOW).should("exist");
    cy.get('[data-testid="open-modal-overlay"]').click(0, 0); // чтобы не пытался кликнуть прям посередине, где модальное окно
    cy.get(MODAL_WINDOW).should("not.exist");
  });

  it("Должно закрыться при нажатии ESC", () => {
    cy.get(OPEN_MODAL_BUTTON).contains("Булка").click();
    cy.get(MODAL_WINDOW).should("exist").wait(500);
    cy.get("body").type("{esc}");
    cy.get(MODAL_WINDOW).should("not.exist");
  });
});
