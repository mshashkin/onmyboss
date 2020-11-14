module.exports = {
     elements: {
      search_field: `.custom-form-control-input`
  
    },

    commands: [{
      search(value) {
          return this
          // .useXpath()
          .click(`@search_field`)
          .clearValue(`@search_field`)
          .setValue(`@search_field`, value)
      }
  }]
}