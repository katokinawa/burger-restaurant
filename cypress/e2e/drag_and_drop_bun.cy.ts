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
    cy.get('[data-testid="сonstructor-ingredients-block-bun"]').as(
      "сonstructorBlockBun"
    ); // блок конструктором

    cy.get("@ingredientsBlock")
      .find('[data-testid="ingredient"]')
      .contains("Булка")
      .as("ingredientDrag"); // берём замоканную булку и присваеваем ей имя

    cy.get("@ingredientDrag").trigger("dragstart").wait(500) // ждём, чтобы не было багов;
    cy.get("@сonstructorBlockBun").trigger("drop").wait(500) // ждём, чтобы не было багов;

    cy.get('[data-testid="bun-constructor-element"]').eq(0)
    .should('exist');
    cy.get('[data-testid="bun-constructor-element"]').eq(1)
    .should('exist');
  });
});
