const contactForms = `
*[_type == "contactForm"]{
    ...,
    formTitle[languageOption->.shortLanguage == $lang][0],
    formSubmit[languageOption->.shortLanguage == $lang][0],
    formList[]->{contactType, contactLanguage[language->.shortLanguage == $lang][0]}
  }
`
export default contactForms