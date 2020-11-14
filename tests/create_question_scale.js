var faker = require('faker');

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber)

var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2)

// var min1 = Math.floor(Math.random() * 90 + 10);

// var max1 = Math.floor(Math.random() * 90 + 10);
// console.log(max1)

// var min2 = Math.floor(Math.random() * 90 + 10);
// console.log(min2)

// var max2 = Math.floor(Math.random() * 90 + 10);
// console.log(max2)

Scale = `Вопрос шкала ${phoneNumber}`
console.log(Scale)
Scale2 = `Вопрос шкала ${phoneNumber2}`
console.log(Scale2)

min1 = `-14`
max1 = `19`
step = `2`

min2 = `-21`
max2 = `25`
step2 = `5`

button_save = `//div[2]/button[2]`

module.exports = {
  'Создание вопроса "Шкала"': function (browser) {
    const page = browser.page.Search()

    browser.page.Login().Auth()
    browser.page.Open_question().Open()
    browser.page.button_add_question().Open()
    browser
      .click("//span/span[2][contains(.,'Шкала')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", Scale)
      .click("//input[@name='scaleMinVal']")
      .clearValue("//input[@name='scaleMinVal']")
      .setValue("//input[@name='scaleMinVal']", min1)
      .click("//input[@name='scaleMaxVal']")
      .clearValue("//input[@name='scaleMaxVal']")
      .setValue("//input[@name='scaleMaxVal']", max1)
      .click("//input[@name='scaleRangeVal']")
      .clearValue("//input[@name='scaleRangeVal']")
      .setValue("//input[@name='scaleRangeVal']", step)
      .click("//div[4]/label/span")

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')
      
      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Scale)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Scale}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${min1}')]`, 10000, 'Название минимального значения правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${max1}')]`, 10000, 'Название максимального значения правильное')
  },

  'Редактирование вопроса "Шкала"': function (browser) {
    const page = browser.page.Search()

    browser
      .click(`//span[contains(.,'Редактировать')]`)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания вопросов открылась')
      .pause(1000)
      .click("//input[@name='text']")
      .clearValue("//input[@name='text']")
      .setValue("//input[@name='text']", Scale2)
      .click("//input[@name='scaleMinVal']")
      .clearValue("//input[@name='scaleMinVal']")
      .setValue("//input[@name='scaleMinVal']", min2)
      .click("//input[@name='scaleMaxVal']")
      .clearValue("//input[@name='scaleMaxVal']")
      .setValue("//input[@name='scaleMaxVal']", max2)
      .click("//input[@name='scaleRangeVal']")
      .clearValue("//input[@name='scaleRangeVal']")
      .setValue("//input[@name='scaleRangeVal']", step2)
      .waitForElementNotPresent(`//input[@name='text2']`, 10000, 'Третий вопрос удалился и отсутствует')

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Scale2)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Scale2}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${min2}')]`, 10000, 'Название минимального значения правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${max2}')]`, 10000, 'Название максимального значения правильное')
      .end()
  }
};