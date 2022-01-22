describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });

  const addDriverCommand = () => {
    Cypress.Commands.add('addDriver', name => {
      cy.get('#driver-input').type(`${name}{enter}`);
    });
  };

  const addNavigatorCommand = () => {
    Cypress.Commands.add('addNavigator', name => {
      cy.get('#navigator-input').type(`${name}{enter}`);
    });
  };

  describe('modal', () => {
    beforeEach(() => {
      addDriverCommand();
      addNavigatorCommand();
    });

    it('드라이버와 네비게이터를 추가할 수 있어야 한다.', () => {
      cy.get('.offset').click();
      cy.addDriver('파랑파랑');
      cy.addNavigator('아벤아벤');

      cy.get('.driver-user .user-name').should('have.text', '파랑파랑');
      cy.get('.navigator-users li').eq(1).find('.user-name').should('have.text', '아벤아벤');
    });
  });
});
