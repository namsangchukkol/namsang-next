const aboutQuery = `
*[_type == 'aboutPage' && metaData.language->.shortLanguage == $lang][0]{
    ...,
    body[]{
      ...,
      _type == 'benefitSection' => {...} ->,
      _type == 'contactSection' => {...} ->,
    }
  }
`

export default aboutQuery