module.exports = function (client) {
  return {
    Open: function (browser) {
      client
      .click("//span[contains(.,'Добавить вопрос')]")
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания аудиторий открылась')
    }
  }
}