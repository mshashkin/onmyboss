module.exports = function (client) {
  return {
    Open: function (browser) {
      client
        .click("//button[@type='button']")
        .waitForElementVisible("//a[contains(text(),'Аудитории')]", 10000, 'Раздел вопросы в меню появился')
        .click("//a[contains(text(),'Аудитории')]")
        .waitForElementVisible("//ng-component/div/div/div[contains(.,'Аудитории')]", 10000, 'Страница Аудитории открылась')
        .waitForElementVisible("//span[contains(.,'Добавить аудиторию')]", 10000, 'Кнопка Добавить аудиторию доступна')
    }
  }
}