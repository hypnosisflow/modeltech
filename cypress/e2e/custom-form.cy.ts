describe("CustomForm component", () => {
  it("should fill out the form and submit successfully", () => {
    cy.visit("http://localhost:5173");

    // дергаем форму начиная флоу с главной
    cy.get("a").contains("Add new").click();

    cy.get("input[placeholder='Выберите дату']").click();
    cy.get("td").contains("12").click();
    cy.get("input[placeholder='Введите температуру']").type("44");
    cy.get("span").contains("Выберите автора").click();
    cy.get("li").contains("jony").click();
    cy.get("span").contains("Выберите погоду").click();
    cy.get("li").contains("sunny").click();
    cy.get("input[placeholder='Ваш коментарий']").type("cypress testing");
    // оправка
    cy.get("button").contains("Отправить").click();
    // редирект
    cy.url().should("not.contain", "weather/add");
    // в таблице появилась запись
    cy.get("tr").contains("cypress testing");
  });
});
