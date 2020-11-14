var faker = require("faker");

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber);

var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2);

Neskolkootvetov = `Вопрос несколько ответов ${phoneNumber}`;
Otvet1 = `Ответ 1`;
Otvet2 = `Ответ 2`;
Otvet3 = `Ответ 3`;
Neskolkootvetov2 = `Вопрос несколько ответов ${phoneNumber2}`;
Otvet21 = `Другой ответ 1`;
Otvet22 = `Другой ответ 2`;
Otvet23 = `Другой ответ 3`;

console.log(Neskolkootvetov);
console.log(Otvet1);
console.log(Otvet2);
console.log(Otvet3);
console.log(Neskolkootvetov2);
console.log(Otvet21);
console.log(Otvet22);
console.log(Otvet23);

button_save = `//div[2]/button[2]`

module.exports = {
  'Создание вопроса "Несколько ответов"': function (browser) {
    const page = browser.page.Search()
    
    browser.page.Login().Auth()
    browser.page.Open_question().Open()
    browser.page.button_add_question().Open()
    browser
      .click("//label/span/span[2][contains(.,'Несколько ответов')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", Neskolkootvetov)
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .click("//input[@name='text0']")
      .setValue("//input[@name='text0']", Otvet1)
      .click("//input[@name='text1']")
      .setValue("//input[@name='text1']", Otvet2)
      .click("//input[@name='text2']")
      .setValue("//input[@name='text2']", Otvet3)
      .click("//div[4]/label/span")
      .click("//div[4]/label[3]/span")
      .click("//div[@id='cdk-drop-list-1']/div/div/label[2]/span")
      .click("//div[@id='cdk-drop-list-1']/div[2]/div/label[2]/span")
      
      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Neskolkootvetov)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Neskolkootvetov}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${Otvet1}')]`, 10000, 'Название 1 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${Otvet2}')]`, 10000, 'Название 2 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${Otvet3}')]`, 10000, 'Название 3 ответа правильное')
  },

  'Редактирование вопроса "Несколько ответов"': function (browser) {
    const page = browser.page.Search()
    
    browser
      .click(`//span[contains(.,'Редактировать')]`)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить вопрос')]", 10000, 'Страница создания вопросов открылась')
      .pause(1000)
      .click(`//input[@name='text']`)
      .clearValue(`//input[@name='text']`)
      .setValue(`//input[@name='text']`, Neskolkootvetov2)
      .pause(1000)
      .click(`//input[@name='text0']`)
      .clearValue(`//input[@name='text0']`)
      .setValue(`//input[@name='text0']`, Otvet21)
      .pause(1000)
      .click(`//input[@name='text1']`)
      .clearValue(`//input[@name='text1']`)
      .setValue(`//input[@name='text1']`, Otvet22)
      .pause(1000)
      .useCss()
      .click(`.cdk-drag:nth-child(3) .button svg`)
      .useXpath()
      .click(`//div[2]/div/label[2]/span/span`)
      .waitForElementNotPresent(`//input[@name='text2']`, 10000, 'Третий вопрос удалился и отсутствует')

      // Сохранение
      .click(button_save)
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Вопросы')]", 10000, 'Страница Вопросы открылась')

      // Перелогинивание
    browser.page.Relogin().Open()
    browser.page.Open_question().Open()

      // Поиск 
    page
      .search(Neskolkootvetov2)

    browser
      .useXpath()

      // Проверки
      .click(`(//button[@type='button'])[8]`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${Neskolkootvetov2}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${Otvet21}')]`, 10000, 'Название 1 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${Otvet22}')]`, 10000, 'Название 2 ответа правильное')
      .end()
  }
}