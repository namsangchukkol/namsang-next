const contactPage = `
*[_type == 'contactPage' && metaData.language->.shortLanguage == $lang][0]{
    ...,
    body[]{
      ...,
       _type == "bannerTemplate" => {
        banner{
            ...,
            banner{
                ...,
                bannerTemplate2->{
                    ...,
                    formTitle[languageOption->.shortLanguage == $lang][0],
                    formSubmit[languageOption->.shortLanguage == $lang][0],
                    formList[]->{...,contactLanguage[language->.shortLanguage == $lang][0]}
                }
            }
        }
       }
    }
  }
`

export default contactPage