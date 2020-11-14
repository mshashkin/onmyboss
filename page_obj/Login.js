module.exports = function (client) {
    return {
      Auth: function (browser) {
        client
          .url('https://ohmyboss1.dsml.ru/login')
          .windowMaximize()
          .useCss()
          .setValue('input[name=email]', 'mail@innoline.pro')
          .setValue('input[name=password]', 'P@ssw0rd')
          .useXpath()
          .click("//button/span[2]")
          .waitForElementVisible("//ng-component/div/div/div[contains(.,'Персональные опросы')]", 10000, 'Авторизация прошла успешно')
      }
    }
  }