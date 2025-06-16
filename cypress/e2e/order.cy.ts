/// <reference types="cypress" />

describe('Тест создания заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.setupConstructorIntercepts();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  it('проверка нового заказа', () => {
    const noBunSelector1 = `[data-cy=no_bun_text_1]`;
    const noBunSelector2 = `[data-cy=no_bun_text_2]`;
    const noIngredientsSelector = `[data-cy=no_ingredients_text]`;
    const bunSelector = `[data-cy=bun_0]`;
    const ingredientSelector = `[data-cy=ingredient_0]`;

    const bun = cy.get(bunSelector + ` button`);
    const ingredient = cy.get(ingredientSelector + ` button`);
    bun.click();
    ingredient.click({ multiple: true });

    cy.get(`[data-cy=new_order_total] button`).click();

    cy.fixture('newOrder.json').then((newOrder) => {
      const API_URL = Cypress.env('BURGER_API_URL');
      cy.intercept('POST', `${API_URL}/orders`, newOrder).as('newOrder');

      cy.get(`[data-cy=new_order_number]`).contains(newOrder.order.number);
      cy.get(`[data-cy=close_modal_btn]`).click();

      // Проверяем пустоту после закрытия модалки
      cy.get(noBunSelector1).as('noBunText1');
      cy.get(noBunSelector2).as('noBunText2');
      cy.get(noIngredientsSelector).as('noIngredientsText');

      cy.get('@noBunText1').contains('Выберите булки');
      cy.get('@noBunText2').contains('Выберите булки');
      cy.get('@noIngredientsText').contains('Выберите начинку');
    });
  });
});