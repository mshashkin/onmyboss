var faker = require('faker');

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber)

var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2)

Rating = `Вопрос рейтинг ${phoneNumber}`
console.log(Rating)

Rating2 = `Вопрос рейтинг ${phoneNumber2}`
console.log(Rating2)

Smile = `Смайлы`
Stars = `Звезды`
Range = `1-10`

button_save = `//div[2]/button[2]`

module.exports = {
  'Создание вопроса "рейтинг"': function (browser) {
    const page = browser.page.Search()

    browser.page.Login().Auth()
    browser.page.Open_question().Open()
    browser.page.button_add_question().Open()
    browser
      .click("//span/span[2][contains(.,'Рейтинг')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", Rating)
      .click("//ng-select/div")
      .waitForElementVisible(`//span[contains(.,'${Smile}')]`, 10000, 'Меню выбора типа типа иконок открылось')
      .click(`//span[contains(.,'${Smile}')]`)
    
      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Rating)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Rating}')]`, 10000, 'Название рейтинга правильное')
  },

  'Редактирование вопроса "рейтинг"': function (browser) {
    const page = browser.page.Search()

    browser
      .click(`//span[contains(.,'Редактировать')]`)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания вопросов открылась')
      .pause(1000)
      .click(`//input[@name='text']`)
      .clearValue(`//input[@name='text']`)
      .setValue(`//input[@name='text']`, Rating2)

      // Выбор типа иконок
      .click(`//ng-select/div`)
      .waitForElementVisible(`//span[contains(.,'${Stars}')]`, 10000, 'Меню выбора типа типа иконок открылось')
      .click(`//span[contains(.,'${Stars}')]`)

      // Выбор диапазона
      .click(`//ng-select[2]/div`)
      .waitForElementVisible(`//div[2]/div[2]/span[contains(.,'${Range}')]`, 10000, 'Меню выбора типа типа иконок открылось')
      .click(`//div[2]/div[2]/span[contains(.,'${Range}')]`)

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')
  
      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Rating2)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Rating2}')]`, 10000, 'Название рейтинга правильное')
      .end()
  }
}