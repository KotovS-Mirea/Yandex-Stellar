/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      setupConstructorIntercepts(): Chainable<void>;
    }
  }
}

// Реализация команды
Cypress.Commands.add('setupConstructorIntercepts', () => {
  const API_URL = Cypress.env('BURGER_API_URL');

  // Ингредиенты
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept('GET', `${API_URL}/ingredients`, ingredients).as('getIngredients');
  });

  // Заказы
  cy.fixture('orders.json').then((orders) => {
    cy.intercept('GET', `${API_URL}/orders/all`, orders).as('getOrders');
  });

  // Авторизация
  cy.fixture('user.json').then((user) => {
    cy.intercept('GET', `${API_URL}/auth/user`, user).as('getUser');
  });
});