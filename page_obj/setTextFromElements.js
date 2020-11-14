module.exports = {
  elements: {},
  commands: [{
    setTextFromID(id) {
      let text = []
      this.expect.element(id).to.be.visible
      this.getText(id, res => {
        text.push(res.value)
      })
      return text[0]
    }
  }]
};