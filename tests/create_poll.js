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

question_title = `Тестовый вопрос`
answer_1 = `11`
answer_2 = `22`

question_title2 = `Другой тестовый вопрос`
answer_21 = `33`
answer_22 = `44`
answer_23 = `55`


delimiter_name = `Тестовый разделитель`
delimiter_comment = `Комментарий для разделителя`
description_for_comment = `Описание для разделителя`

delimiter_name2 = `Отредактированный разделитель`
delimiter_comment2 = `Отредактированный комментарий для разделителя`
description_for_comment2 = `Отредактированное описание для разделителя`












// Titlenotification = `Тестовое предварительное уведомление ${phoneNumber}`;
// Headernotification = `Заголовок предварительного уведомления`;
// Commentnotification = `Текст предварительного уведомления`;
Name2 = `Тестовый опрос ${phoneNumber2}`;
Comment2 = `Комментарий к тестовому опросу 2`;
// Checkbox2 = `Анонимный`;
// Titlenotification2 = `Тестовое предварительное уведомление ${phoneNumber2}`;
// Headernotification2 = `Заголовок предварительного уведомления 2`;
// Commentnotification2 = `Текст предварительного уведомления 2`;

button_next = "//button[contains(.,'Далее')]"

module.exports = {
  'Создание опроса': function (browser) {
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
      .setValue("//input[@name='text']", question_title)
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .click("//span[contains(.,'Добавить вариант ответа')]")
      .setValue("//input[@name='text0']", answer_1)
      .setValue("//input[@name='text1']", answer_2)
      .click("//div[3]/div[2]/button[2]")
      .waitForElementNotPresent("//h3[contains(.,'Добавление вопроса')]", 10000)
      .waitForElementVisible(`//div[3][contains(.,'${question_title}')]`, 10000, 'Вопрос после создания присутствует')

      // Добавление разделителя
      .click("//span[contains(.,'Добавить разделитель')]")
      .click("//input[@name='title']")
      .setValue("//input[@name='title']", delimiter_name)
      .click("//input[@name='comment']")
      .setValue("//input[@name='comment']", delimiter_comment)
      .click("//input[@name='description']")
      .setValue("//input[@name='description']", description_for_comment)
      .click("//div[3]/div[2]/button/span")
      .waitForElementNotPresent("//h3[contains(.,'Добавление разделителя')]", 10000)
      .waitForElementVisible(`//div[3][contains(.,'${delimiter_name}')]`, 10000, 'Разделитель после создания присутствует')

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

      // Перелогинивание
    browser.page.Relogin().Open()

      // Поиск 
    browser
      // .click(`//button[contains(.,'Запланированные')]`)
      .click(`//input[@name='condition']`)
      .clearValue(`//input[@name='condition']`)
      .setValue(`//input[@name='condition']`, Name)
      .click(`//form/div[2]/button`)
      .waitForElementVisible(`//button[contains(.,'Запланированные')]`, 10000, 'Кнопка Запланированные доступна')
      .click(`//button[contains(.,'Запланированные')]`)
      .waitForElementVisible(`//clr-dg-cell[2]/div/div[contains(.,'${Name}')]`, 10000, 'В списке вопросов присутствует созданный опрос')
    },

  'Редактирование опроса': function (browser) {
    browser
      .click(`//clr-dropdown/button`)
      .click(`//a[contains(text(),'Редактировать')]`)
      .waitForElementVisible(`//input[@name='title']`, 10000, 'Форма загрузилась, поле ввода доступно')
      .click(`//input[@name='title']`)
      .clearValue(`//input[@name='title']`)
      .setValue(`//input[@name='title']`, Name2)
      .click("//textarea[@name='comment']")
      .pause(5000)
      .setValue("//textarea[@name='comment']", Comment2)
      .click(button_next)

      // Редактирование вопроса

      // Просмотр вопроса через глазок
      .click(`//DIV[text()='${question_title}']/..//BUTTON/app-icon[@name='eyeClosed']`)
      .waitForElementVisible(`//clr-modal/div/div/div[2]/div/div/div/div[contains(.,'${question_title}')]`, 10000, 'Название вопроса правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${answer_1}')]`, 10000, 'Название 1 ответа правильное')
      .waitForElementVisible(`//div/div[2]/div/div[2]/div[2]/div/div[contains(.,'${answer_2}')]`, 10000, 'Название 2 ответа правильное')
      .click(`//div[3]/div[2]/button/span[contains(.,'Редактировать')]`)
      .pause(1000)
      .waitForElementVisible(`//span[contains(.,'Отмена')]`, 10000, 'Открывается pop up редактирования вопроса, кнопка отмена доступна')
      .click(`//span[contains(.,'Отмена')]`)
      .waitForElementVisible(`//DIV[text()='${question_title}']/..//BUTTON/app-icon[@name='edit']`, 10000, 'Опрос и кнопка глазок доступны')
      .pause(1000)
      // .waitForElementVisible(`//div[2]/div/div/div[contains(.,'Вопросы')]`, 10000, 'Открылась страница добавления вопросов')

      // Редактирование вопроса через карандаш
      .click(`//DIV[text()='${question_title}']/..//BUTTON/app-icon[@name='edit']`)
      .waitForElementVisible(`//h3[contains(.,'Редактирование вопроса')]`, 10000, 'Открывается pop up редактирования вопроса')
      .click("//input[@name='text']")
      .clearValue(`//input[@name='text']`)
      .setValue("//input[@name='text']", question_title2)
      // .waitForElementVisible(`//input[@name='text0']`, 10000, 'Открывается pop up редактирования вопроса')
      .click("//input[@name='text0']")
      .clearValue(`//input[@name='text0']`)
      .setValue("//input[@name='text0']", answer_21)
      // .waitForElementVisible(`//input[@name='text1']`, 10000, 'Открывается pop up редактирования вопроса')
      .click("//input[@name='text1']")
      .clearValue(`//input[@name='text1']`)
      .setValue("//input[@name='text1']", answer_22)
      .click("//span[contains(.,'Добавить вариант ответа')]")
      // .waitForElementVisible(`//input[@name='text2']`, 10000, 'Открывается pop up редактирования вопроса')
      .click("//input[@name='text2']")
      .clearValue(`//input[@name='text2']`)
      .setValue("//input[@name='text2']", answer_23)
      .click("//span[text()='Сохранить']")
      .waitForElementVisible(`//div[2]/div/div/div[contains(.,'Вопросы')]`, 10000, 'Открылась страница добавления вопросов')

      // Редактирование разделителя

      // Просмотр разделителя через глазок
      .waitForElementVisible(`//DIV[text()='${delimiter_name}']/..//BUTTON/app-icon[@name='eyeClosed']`, 10000, 'Опрос и кнопка глазок доступны')
      .pause(2000)
      .click(`//DIV[text()='${delimiter_name}']/..//BUTTON/app-icon[@name='eyeClosed']`)
      .waitForElementVisible(`//h3[contains(.,'${delimiter_name}')]`, 10000, 'Название разделителя правильное')
      .click(`//span[contains(.,'Закрыть')]`)
      .waitForElementVisible(`//div[2]/div/div/div[contains(.,'Вопросы')]`, 10000, 'Открылась страница добавления вопросов')

      // Редактирование разделителя через карандаш
      .click(`//DIV[text()='${delimiter_name}']/..//BUTTON/app-icon[@name='edit']`)
      .waitForElementVisible(`//h3[contains(.,'Редактирование разделителя')]`, 10000, 'Открывается pop up редактирования разделителя')
      .pause(1000)
      .click("//input[@name='title']")
      .clearValue(`//input[@name='title']`)
      .setValue("//input[@name='title']", delimiter_name2)
      .pause(1000)
      .click("//input[@name='comment']")
      .clearValue(`//input[@name='comment']`)
      .setValue("//input[@name='comment']", delimiter_comment2)
      .pause(1000)
      .click("//input[@name='description']")
      .clearValue(`//input[@name='description']`)
      .setValue("//input[@name='description']", description_for_comment2)
      .pause(1000)
      .click(`//span[contains(.,'Сохранить')]`)
      .waitForElementVisible(`//div[2]/div/div/div[contains(.,'Вопросы')]`, 10000, 'Открылась страница добавления вопросов')
      .click(button_next)


      .pause(50000)

  }
};