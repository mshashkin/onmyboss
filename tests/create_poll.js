var faker = require("faker");
var phoneNumber = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber);
var phoneNumber2 = Math.floor(Math.random() * 900 + 1000);
console.log(phoneNumber2);

Name = `Тестовый опрос ${phoneNumber}`;
Comment = `Комментарий к тестовому опросу`;
Checkbox = `Неанонимный`;
Gender = `Мужчины`;
years_min = `17`;
years_max = `64`;

Titlenotification = `Тестовое предварительное уведомление ${phoneNumber}`;
Headernotification = `Заголовок предварительного уведомления`;
Commentnotification = `Текст предварительного уведомления`;
Name2 = `Тестовый опрос ${phoneNumber2}`;
Comment2 = `Комментарий к тестовому опросу 2`;
Checkbox2 = `Анонимный`;
Titlenotification2 = `Тестовое предварительное уведомление ${phoneNumber2}`;
Headernotification2 = `Заголовок предварительного уведомления 2`;
Commentnotification2 = `Текст предварительного уведомления 2`;

button_next = "//button[contains(.,'Далее')]"

module.exports = {
  "Создание опроса": function (browser) {
    browser.page.Login().Auth()
    browser
      .useXpath()
      .click("//a[contains(.,'Персональные опросы')]")
      .click("//button[contains(.,'Добавить опрос')]")

      // Первый шаг Основное
      .waitForElementVisible("//div[2]/div/div/div[contains(.,'Основное')]", 10000, 'Открылась страница опроса')
      .click("//input[@name='title']")
      .setValue("//input[@name='title']", Name)
      .click("//textarea[@name='comment']")
      .pause(5000)
      .setValue("//textarea[@name='comment']", Comment)
      .click(`//span[contains(.,'Анонимный')]`)
      .click(button_next)

      // Второй шаг Вопросы
      .waitForElementVisible("//div[2]/div/div/div[contains(.,'Вопросы')]", 10000, 'Открылась страница добавления вопросов')
      // Удалить блок после устранения бага. Не подтягиваются вопросы

      // Добавление вопроса
      .click("//span[contains(.,'Добавить вопрос')]")
      .click("//input[@name='text']")
      .setValue("//input[@name='text']", `Тестовый вопрос`)
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .setValue("//input[@name='text0']", `11`)
      .setValue("//input[@name='text1']", `22`)
      .click("//div[3]/div[2]/button[2]")
      .waitForElementNotPresent("//h3[contains(.,'Добавление вопроса')]", 10000)
      .waitForElementVisible("//div[3][contains(.,'Тестовый вопрос')]", 10000, 'Вопрос после создания присутствует')

      // Добавление разделителя
      .click("//span[contains(.,'Добавить разделитель')]")
      .click("//input[@name='title']")
      .setValue("//input[@name='title']", `Тестовый разделитель`)
      .click("//input[@name='comment']")
      .setValue("//input[@name='comment']", `Комментарий для разделителя`)
      .click("//input[@name='description']")
      .setValue("//input[@name='description']", `Описание для разделителя`)
      .click("//div[3]/div[2]/button/span")
      .waitForElementNotPresent("//h3[contains(.,'Добавление разделителя')]", 10000)
      .waitForElementVisible("//div[3][contains(.,'Тестовый разделитель')]", 10000, 'Разделитель после создания присутствует')

      .click(button_next)
      .pause(2000)

      // Третий шаг Аудитории
      .waitForElementVisible("//div[2]/div/div/div[contains(.,'Аудитории')]", 10000, 'Открылась страница добавления аудитории')
      .click("//div/button[2]")
      .waitForElementVisible("//div[2]/div/div[2]/div[2]", 10000, 'Есть минимум 1 аудитория')
      .moveToElement("//div[2]/div/div[2]/div[2]", 15, 15)
      .mouseButtonDown(0)
      .moveToElement("//div[2]/div/div[2]/div[2]", -500, 0)
      .moveToElement("//div[2]/div/div[2]/div[2]", -500, -40)
      .mouseButtonUp(0)
      .waitForElementVisible("//h3[contains(.,'Задать дополнительные условия?')]", 10000, 'При добавлении аудитории появляется уведомление "Задать дополнительные условия?"')
      .click("//button[contains(.,'Да, внести')]")
      .waitForElementVisible("//div[2]/div/div[2]/div/div[2]", 10000, 'Аудитория выбралась')
      .waitForElementVisible("//h3[contains(.,'Дополнительные условия отбора')]", 10000, 'Открылся pop up редектирования аудитории')
      .click(`//span[contains(.,'${Gender}')]`)
      .click("//ng-select/div")
      .click("//div[2]/div[2]/span")
      .click("//ng-select[2]/div")
      .click("//div[47]/span")
      .click("//span[contains(.,'Сохранить')]")
      .waitForElementNotPresent("//h3[contains(.,'Дополнительные условия отбора')]", 10000, 'Закрылся pop up редектирования аудитории')
      .click("(//button[@type='button'])[7]")
      .waitForElementVisible(`//span[contains(.,'${Gender}')]`, 10000, 'Параметр пола присутсвует')
      .waitForElementVisible("//span[contains(.,'Возраст 17 - 64')]", 10000, 'Параметр возраста присутсвует')
      .click("(//button[@type='button'])[6]")
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div[2][contains(.,'Вы действительно хотите удалить?')]`, 10000, 'Открылся pop up Вы действительно хотите удалить?')
      .click("//div[3]/div[2]/button")
      .waitForElementNotPresent("//clr-modal/div/div/div[2]/div/div[2][contains(.,'Вы действительно хотите удалить?')]", 10000, 'Закрылся pop up удаления аудитории')
      // .waitForElementNotPresent("(//DIV[@_ngcontent-qic-c197=''][text()='Аудитории']/../..//DIV[@_ngcontent-qic-c197=''])[8]", 10000, 'Аудитория пропала из списка')
      .waitForElementVisible("//div[2]/div/div[2]/div[2]", 10000, 'Есть минимум 1 аудитория')
      .moveToElement("//div[2]/div/div[2]/div[2]", 15, 15)
      .mouseButtonDown(0)
      .moveToElement("//div[2]/div/div[2]/div[2]", -500, 0)
      .moveToElement("//div[2]/div/div[2]/div[2]", -500, -40)
      .mouseButtonUp(0)
      .click("//button[contains(.,'Нет')]")
      .click(button_next)
      .pause(2000)

      // Четвертый шаг

      // Выбор даты начала уведомления
      .waitForElementVisible("//div[2]/div/div/div[contains(.,'Настройки')]", 10000, 'Открылась страница настроек')
      .click("//input[@name='day']")
      .waitForElementVisible("//div/button[@aria-label='След месяц']", 10000, 'Достпуна кнопка переключения месяцев')
      .click("//div/button[@aria-label='След месяц']")
      .waitForElementVisible("//span[contains(.,'5')]", 10000, 'Достпуна кнопка дня')
      .click("//span[contains(.,'5')]")
      .waitForElementNotPresent("//span[contains(.,'5')]", 10000, 'Pop up выбора даты закрылся')
      .click("//input[@name='startTime']")
      .waitForElementVisible("//owl-date-time-timer-box[2]/button/span", 10000, 'Достпуна кнопка переключение времени')
      .click("//owl-date-time-timer-box[2]/button/span")
      .click("//span[contains(.,'Сохранить')]")
      .waitForElementNotPresent("//span[contains(.,'Сохранить')]", 10000, 'Pop up выбора времени закрылся')
      .click("//ng-select/div/div/div[3]")

      // Выбор даты завершения уведомления
      .click("(//input[@name='day'])[2]")
      .waitForElementVisible("//div/button[@aria-label='След месяц']", 10000, 'Достпуна кнопка переключения месяцев')
      .click("//div/button[@aria-label='След месяц']")
      .click("//div/button[@aria-label='След месяц']")
      .waitForElementVisible("//span[contains(.,'25')]", 10000, 'Достпуна кнопка дня')
      .click("//span[contains(.,'25')]")
      .waitForElementNotPresent("//span[contains(.,'25')]", 10000, 'Pop up выбора даты закрылся')
      .click("(//input[@name='startTime'])[2]")
      .waitForElementVisible("//owl-date-time-timer-box[2]/button/span", 10000, 'Достпуна кнопка переключение времени')
      .click("//owl-date-time-timer-box[2]/button/span")
      .click("//span[contains(.,'Сохранить')]")
      .click("//div[2]/app-dates/div/div[3]/ng-select/div/div/div[3]")
      .waitForElementVisible("//form/div/div[3]/div[2]", 10000, 'Появляется время жизни уведомления')


      //Создание уведомления
      // .click("//span[contains(.,'Добавить уведомление')]")
      // .waitForElementVisible("//h3[contains(.,'Добавление уведомления')]", 10000, 'Открылась форма добавления уведомления')
      // .click("//input[@name='title']")
      // .setValue("//input[@name='title']", Titlenotification)
      // .click("//input[@name='header']")
      // .setValue("//input[@name='header']", Headernotification)
      // .click("//input[@name='comment']")
      // .setValue("//input[@name='comment']", Commentnotification)
      // .click("//span[contains(.,'Slack')]")
      // .click("//span[contains(.,'Личный кабинет')]")
      // .click("//form/ng-select/div")
      // .waitForElementVisible("//div[2]/div[2]/span", 10000, 'Доступен выбор типа уведомления')
      // .click("//div[2]/div[2]/span")
      // .click("(//input[@name='day'])[3]")
      // .waitForElementVisible("//owl-date-time-calendar/div/button[2]/span", 10000, 'Достпуна кнопка переключения месяцев')
      // .click("//owl-date-time-calendar/div/button[2]/span")
      // .waitForElementVisible("//span[contains(.,'5')]", 10000, 'Достпуна кнопка дня')
      // .click("//span[contains(.,'5')]")
      // .waitForElementNotPresent("//span[contains(.,'5')]", 10000, 'Pop up выбора даты закрылся')
      // .click("//form/app-dates/div/div[2]/label/input")
      // .waitForElementVisible("//owl-date-time-container[@id='owl-dt-picker-9']/div[2]/owl-date-time-timer/owl-date-time-timer-box/button", 10000, 'Достпуна кнопка переключение времени')
      // .click("//owl-date-time-container[@id='owl-dt-picker-9']/div[2]/owl-date-time-timer/owl-date-time-timer-box/button")
      // .click("(//button[@type='button'])[17]")
      // .click("//form/app-dates/div/div[3]/ng-select/div/div/div[3]")
      // .click("//div[3]/div[2]/button/span")

      .click("//span[contains(.,'Создать опрос')]")
      .waitForElementVisible("//h3[contains(.,'Обратите внимание!')]", 10000, 'Появляется уведомление "Уведомление может быть выслано в течении 1 часа."')
      .waitForElementVisible("//button[contains(.,'Понятно')]", 10000, 'Появилась кнопка Понятно')
      .click("//button[contains(.,'Понятно')]")
      .waitForElementVisible("//ng-component/div/div/div[contains(.,'Персональные опросы')]", 10000, 'Открылась страница опросов')
      .waitForElementVisible("//clr-dg-row", 10000, 'Таблица опросов загрузилась')
      // .click("(//button[@type='button'])[9]")
      // .waitForElementVisible("(//button[@type='button'])[10]", 10000)
      // .click("//input[@name='condition']")
      // .setValue("//input[@name='condition']", Name)
      // .click("//form/div[2]/button")
      // .pause(2000)
      // .click("(//button[@type='button'])[9]")
      .waitForElementVisible(`//clr-dg-cell[2]/div/div[contains(.,'${Name}')]`, 10000, 'В списке вопросов присутствует созданный опрос')
      
      // Проверки создания опроса
      // .moveToElement("//div[@id='clr-dg-row320']/div[2]/div/clr-dg-cell[2]/div/div[2]/clr-tooltip")
      .waitForElementVisible(`(//DIV[@_ngcontent-krd-c201=''][text()=' Тестовый опрос 1816 ']/../../..//BUTTON[@_ngcontent-krd-c201=''])[3]`, 10000)
      // .click(`(//DIV[@_ngcontent-krd-c201=''][text()=' ${Name} ']/../../..//BUTTON[@_ngcontent-krd-c201=''])[3]`)

      // .click("//a[contains(text(),'Редактировать')]")
      // .waitForElementVisible(`//clr-dg-cell[2]/div/div[contains(.,' ${Name} ')]`, 10000, '...')
      // .waitForElementVisible("//div[2]/div/div/div[contains(.,'Основное')]", 10000, 'Открылась страница опроса')
      // .waitForElementVisible("//div[2]/div/div/div[contains(.,'Основное')]", 10000, 'Открылась страница опроса')


      .pause(5000)
      
  }
};