var faker = require('faker');

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber)

Openquestion = `Вопрос открытый вопрос ${phoneNumber}`
console.log(Openquestion)

var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2)

Openquestion2 = `Вопрос открытый вопрос ${phoneNumber2}`
console.log(Openquestion2)

button_save = `//div[2]/button[2]`

module.exports = {
  'Создание вопроса "Открытый вопрос"': function (browser) {
    const page = browser.page.Search()
    
    browser.page.Login().Auth()
    browser.page.Open_question().Open()
    browser.page.button_add_question().Open()
    browser
      .click("//label/span/span[2][contains(.,'Открытый вопрос')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", Openquestion)
      .click("//div[4]/label/span")

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Openquestion)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Openquestion}')]`, 10000, 'Название вопроса правильное')
  },

  'Редактирование вопроса "Открытый вопрос"': function (browser) {
    const page = browser.page.Search()

    browser
      .click(`//span[contains(.,'Редактировать')]`)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания вопросов открылась')
      .pause(1000)
      .click(`//input[@name='text']`)
      .clearValue(`//input[@name='text']`)
      .setValue(`//input[@name='text']`, Openquestion2)

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')
    
      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Openquestion2)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Openquestion2}')]`, 10000, 'Название вопроса правильное')
      .end()
  }
}