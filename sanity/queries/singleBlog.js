const singleBlog = `
*[_type == 'blogs' ][0]{
  ...,
  "blogContent": blogContent[language->.shortLanguage == $lang][0],
  "metaData": metaData[language->.shortLanguage == $lang][0]
}
`;

export default singleBlog;
