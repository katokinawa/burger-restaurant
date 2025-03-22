import { testUrl } from "../../src/utils/constants"

describe("Drag & Drop тест булки", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredient" }).as(
      "getIngredients"
    ); // мокаем запрос ингредиентов
    cy.visit(testUrl);
  });

  it("Должен перетащить ингредиент в конструктор", () => {
    cy.get('[data-testid="ingredients-elements-block"]').as(
      "ingredientsBlock"
    ); // блок с ингредиентами
    cy.get('[data-testid="сonstructor-ingredients-block-ingredient"]').as(
      "сonstructorBlockIngredient"
    ); // блок с конструктором

    cy.get("@ingredientsBlock")
      .find('[data-testid="ingredient"]')
      .contains("Соус")
      .as("ingredientDrag"); // берём замоканый ингредиент и присваеваем ей имя

    cy.get("@ingredientDrag").trigger("dragstart").wait(500) // ждём, чтобы не было багов;
    cy.get("@сonstructorBlockIngredient").trigger("drop").wait(500) // ждём, чтобы не было багов;

    cy.get('[data-testid="ingredient-constructor-element"]').eq(0).should("exist");
  });
});
