const blogsQuery = `
*[_type == 'blogsPage' && metaData.language->.shortLanguage == $lang][0]{
  ...,
  body[]{
    ...,
    _type == 'blogsSlideshow' => {slideList[]->{
          ...,
          blogContent[language->.shortLanguage == $lang][0]
      }
    }
  }
}
`
export default blogsQuery