var faker = require('faker');

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber)

var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2)

Yesno = `Вопрос да/нет ${phoneNumber}`
console.log(Yesno)

Yesno2 = `Вопрос да/нет ${phoneNumber2}`
console.log(Yesno2)

da = `ДА`
net = `НЕТ`

da2 = `ВОЗМОЖНО`
net2 = `ВРЯД ЛИ`

button_save = `//div[2]/button[2]`

module.exports = {
  'Создание вопроса "да/нет"': function (browser) {
    const page = browser.page.Search()

    browser.page.Login().Auth()
    browser.page.Open_question().Open()
    browser.page.button_add_question().Open()
    browser
      .click("//label/span/span[2][contains(.,'Да / Нет')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", Yesno)
      .click("//input[@name='text0']")
      .clearValue("//input[@name='text0']")
      .setValue("//input[@name='text0']", `${da}`)
      .click("//input[@name='text1']")
      .clearValue("//input[@name='text1']")
      .setValue("//input[@name='text1']", `${net}`)

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Yesno)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Yesno}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${da}')]`, 10000, 'Название 1 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${net}')]`, 10000, 'Название 2 ответа правильное')
  },

  'Редактирование вопроса "Несколько ответов"': function (browser) {
    const page = browser.page.Search()

    browser
      .click(`//span[contains(.,'Редактировать')]`)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания вопросов открылась')
      .pause(1000)
      .click(`//input[@name='text']`)
      .clearValue(`//input[@name='text']`)
      .setValue(`//input[@name='text']`, Yesno2)
      .pause(1000)
      .click(`//input[@name='text0']`)
      .clearValue(`//input[@name='text0']`)
      .setValue(`//input[@name='text0']`, da2)
      .pause(1000)
      .click(`//input[@name='text1']`)
      .clearValue(`//input[@name='text1']`)
      .setValue(`//input[@name='text1']`, net2)

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')
      
      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Yesno2)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Yesno2}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${da2}')]`, 10000, 'Название 1 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${net2}')]`, 10000, 'Название 2 ответа правильное')
      .end()
  }
}