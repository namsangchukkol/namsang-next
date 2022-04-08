const homeQuery = `
*[_type == 'homePage' && metaData.language->.shortLanguage == $lang ][0]{
  body[]{
    ...,
    _type == 'machineSection' => {...,machineImages[]->},  
    _type == 'blogSection' => {...,blogSection[]->{
      ...,
      "blogContent": blogContent[language->.shortLanguage == $lang][0]
    }},
  },
  metaData,
}
`
export default homeQuery