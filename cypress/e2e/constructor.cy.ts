describe('Базовые проверки конструктора', () => {
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

  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.location('href').should('include', 'localhost:4000');
  });

  it('есть возможность добавлять булку и ингридиенты', () => {
    const noBunSelector1 = `[data-cy=no_bun_text_1]`;
    const noBunSelector2 = `[data-cy=no_bun_text_2]`;
    const noIngredientsSelector = `[data-cy=no_ingredients_text]`;
    const bunSelector = `[data-cy=bun_0]`;
    const ingredientSelector = `[data-cy=ingredient_0]`;

    cy.get(noBunSelector1).as('noBunText1');
    cy.get(noBunSelector2).as('noBunText2');
    cy.get(noIngredientsSelector).as('noIngredientsText');
    cy.get(bunSelector + ` button`).as('bun');
    cy.get(ingredientSelector + ` button`).as('ingredient');

    // Проверяем пустоту перед добавлением
    cy.get('@noBunText1').contains('Выберите булки');
    cy.get('@noBunText2').contains('Выберите булки');
    cy.get('@noIngredientsText').contains('Выберите начинку');

    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.get(`[data-cy=constructor_section]`).contains('булка');
    cy.get(`[data-cy=ingredient_element]`);
  });
});