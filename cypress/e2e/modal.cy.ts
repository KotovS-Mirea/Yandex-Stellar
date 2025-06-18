describe('Тесты модальных окон', () => {
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

  it('проверка открытия и закрытия модального окна ингредиента', () => {
    const bunSelector = `[data-cy=bun_0]`;

    cy.get(bunSelector).then(($ingredient) => {
      const name = $ingredient.find('p.text_type_main-default').text().trim();
      
      cy.get(bunSelector).click();
      
      cy.get(`[data-cy=ingredient_modal]`).should('be.visible');
      cy.get(`[data-cy=ingredient_modal-name]`).should('contain', name);

      cy.get(`[data-cy=close_modal_btn]`).click();
      cy.get(`[data-cy=ingredient_modal]`).should('not.exist');
    });
  });

  it('проверка закрытия модального окна по клику на оверлей', () => {
    const bunSelector = `[data-cy=bun_0]`;
    cy.get(bunSelector).click();
    
    cy.get(`[data-cy=ingredient_modal]`).should('be.visible');
    cy.get(`[data-cy=modal_overlay]`).click({ force: true });
    cy.get(`[data-cy=ingredient_modal]`).should('not.exist');
  });
});