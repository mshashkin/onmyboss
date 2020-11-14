module.exports = function (client) {
  return {
    Open: function (browser) {
      client
        .click("//button[@type='button']")
        .waitForElementVisible("//a[contains(text(),'Вопросы')]", 10000, 'Раздел вопросы в меню появился')
        .click("//a[contains(text(),'Вопросы')]")
        .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')
        .waitForElementVisible("//span[contains(.,'Добавить вопрос')]", 10000, 'Кнопка Добавить вопрос доступна')
    }
  }
}