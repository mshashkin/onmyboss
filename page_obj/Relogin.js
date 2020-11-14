module.exports = function (client) {
  return {
    Open: function (browser) {
      client
        .click("//div/div/div")
        .click("//button[contains(.,'Выход')]")
        client.page.Login().Auth()
      }
  }
}