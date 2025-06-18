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

  it('есть возможность добавлять булку и ингридиенты с проверкой конкретных элементов', () => {
    // пустота перед добавлением
    cy.get('[data-cy=no_bun_text_1]').should('contain', 'Выберите булки');
    cy.get('[data-cy=no_bun_text_2]').should('contain', 'Выберите булки');
    cy.get('[data-cy=no_ingredients_text]').should('contain', 'Выберите начинку');

    // данные булки
    cy.get('[data-cy=bun_0]').then(($bun) => {
      const bunName = $bun.find('p.text_type_main-default').text().trim();
      const bunPrice = $bun.find('p.text_type_digits-default').text().trim();

      cy.get('[data-cy=bun_0] button').click();
      cy.get('[data-cy=constructor_bun_top]')
        .should('contain', bunName)
        .and('contain', bunPrice);
        
      cy.get('[data-cy=constructor_bun_bottom]')
        .should('contain', bunName)
        .and('contain', bunPrice);
    });

    // ингредиенты и соусы
    for (let i = 0; i < 8; i++) {
      cy.get(`[data-cy=category_Начинки] [data-cy=ingredient_${i}]`).first().then(($ingredient) => {
        const ingredientName = $ingredient.find('p.text_type_main-default').text().trim();
        cy.wrap($ingredient).find('button:contains("Добавить")').click();
        
        // проверка добавленного ингредиента в конструкторе
        cy.get(`[data-cy=constructor_ingredient_${i}]`) 
          .find('.constructor-element__text')  
          .should('contain', ingredientName);
      });
    }
    for (let i = 0; i < 4; i++) {
      cy.get(`[data-cy=category_Соусы] [data-cy=ingredient_${i}]`).first().then(($ingredient) => {
        const ingredientName = $ingredient.find('p.text_type_main-default').text().trim();
        cy.wrap($ingredient).find('button:contains("Добавить")').click();
        
        // проверка добавленного ингредиента в конструкторе (8 добавлены до)
        cy.get(`[data-cy=constructor_ingredient_${8+i}]`) 
          .find('.constructor-element__text')  
          .should('contain', ingredientName);
      });
    }
  });
});