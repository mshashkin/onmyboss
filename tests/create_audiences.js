var faker = require('faker');

var phoneNumber = Math.floor(Math.random() * 900 + 1000);
var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
var phoneNumber3 = Math.floor(Math.random() * 900 + 1000);
var phoneNumber4 = Math.floor(Math.random() * 900 + 1000);

var phoneNumber5 = Math.floor(Math.random() * 900 + 1000);
var phoneNumber6 = Math.floor(Math.random() * 900 + 1000);
var phoneNumber7 = Math.floor(Math.random() * 900 + 1000);
var phoneNumber8 = Math.floor(Math.random() * 900 + 1000);

Name = `Аудитория ${phoneNumber}`
Description = `Краткое описание ${phoneNumber2}`
Name2 = `Аудитория ${phoneNumber3}`
Description2 = `Краткое описание ${phoneNumber4}`

Name3 = `Аудитория ${phoneNumber5}`
Description3 = `Краткое описание ${phoneNumber6}`
Name4 = `Аудитория ${phoneNumber7}`
Description4 = `Краткое описание ${phoneNumber8}`

gender = `Мужчины`
gender2 = `Женщины`
Family = `Не замужем/не женат`
Family2 = `Замужем/женат`
Family3 = `В разводе`
Agemin = `17`
Agemax = `64`
Agemin2 = `33`
Agemax2 = `65`

console.log(`${Name}`)
console.log(`${Description}`)
console.log(`${Name2}`)
console.log(`${Description2}`)
console.log(`${Name3}`)
console.log(`${Description3}`)
console.log(`${Name4}`)
console.log(`${Description4}`)



module.exports = {
  'Создание аудитории': function (browser) {
    const page = browser.page.Search();
    browser
    browser.page.Login().Auth()
    browser.page.Open_audience().Open()
    browser
      // Создание 
      .click("//span[contains(.,'Добавить аудиторию')]")
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить аудиторию')]", 10000, 'Страница создания аудиторий открылась')
      .click(`//input[@name='title']`)
      .setValue(`//input[@name='title']`, Name)
      .click(`//textarea[@name='description']`)
      .setValue(`//textarea[@name='description']`, Description)
      .click(`//label[contains(.,'Задать условия аудитории')]`)
      .click(`//div[5]/label[2]/span/span[contains(.,'${gender}')]`)
      .click(`//div[7]/label/span/span[contains(.,'${Family}')]`)
      .click(`//ng-select/div`)
      .click(`//span[contains(.,'${Agemin}')]`)
      .click(`//ng-select[2]/div`)
      .click(`//span[contains(.,'${Agemax}')]`)

      // Сохранение
      .click(`//span[contains(.,'Добавить')]`)
      .waitForElementVisible(`//ng-component/div/div/div[contains(.,'Аудитории')]`, 10000, 'Страница Аудитории открылась')
    
      // Перелогинивание
      browser.page.Relogin().Open()
      browser.page.Open_audience().Open()
      
      // Поиск 
      page
      .search(Name)

      browser
      .useXpath()

      // Проверки
      .waitForElementVisible(`//clr-dg-cell[contains(.,'${Name}')]`, 10000, 'Аудитория создана успешно')
      .waitForElementVisible(`//clr-dg-cell[contains(.,'${Name}')]`, 10000, 'Название соответствует')
      .waitForElementVisible(`//clr-dg-cell[contains(.,'${Description}')]`, 10000, 'Краткое описание соответствует')
    },   

    'Редактирование аудитории': function (browser) {
    browser
      .useCss()
      .click(`.button:nth-child(1) > .omb-icon svg`)
      .useXpath()
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Добавить аудиторию')]", 10000, 'Страница редактированя аудиторий открылась')
      .pause(1000)
      .click(`//input[@name='title']`)
      .clearValue(`//input[@name='title']`)
      .setValue(`//input[@name='title']`, Name2)
      .pause(1000)
      .click(`//textarea[@name='description']`)
      .clearValue(`//textarea[@name='description']`)
      .setValue(`//textarea[@name='description']`, Description2)
      .pause(1000)
      .click(`//label[contains(.,'Выбрать по подразделениям')]`)
      .click(`//div/div/label`)
      .click(`//clr-tree-node/div/button`)
      .click(`//clr-tree-node[10]/div/div/label`)

      // Сохранение
      .click(`//button[contains(.,'Сохранить')]`)
      .waitForElementVisible(`//ng-component/div/div/div[contains(.,'Аудитории')]`, 10000, 'Страница Аудитории открылась')
    
      // Перелогинивание
      browser.page.Relogin().Open()
      browser

      // Поиск 
      page
      .search(Name2)

      browser
      .useXpath()

      // Проверки
      .waitForElementVisible(`//clr-dg-cell[contains(.,'${Name2}')]`, 10000, 'Название соответствует')
      .waitForElementVisible(`//clr-dg-cell[contains(.,'${Description2}')]`, 10000, 'Краткое описание соответствует')

      .pause(50000)



      .end()
  }   
}