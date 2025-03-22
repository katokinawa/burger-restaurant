describe("Проверка логики работы модального окна", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredient" }).as(
      "getIngredients"
    ); // мокаем запрос ингредиентов
    cy.visit("http://localhost:5173/");
    cy.viewport('macbook-11')  // для удобства
  });

  it("Должно открыться по клику", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist").wait(500);
  });

  it("Должно закрыться по клику на оверлей", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist");
    cy.get('[data-testid="open-modal-overlay"]').click(0, 0); // чтобы не пытался кликнуть прям посередине, где модальное окно
    cy.get('[data-testid="modal-window"]').should("not.exist");
  });

  it("Должно закрыться при нажатии ESC", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist").wait(500);
    cy.get("body").type("{esc}");
    cy.get('[data-testid="modal-window"]').should("not.exist");
  });
});
