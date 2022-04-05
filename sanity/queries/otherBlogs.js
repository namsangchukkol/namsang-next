const otherBlogs = `
*[_type == 'blogs' && blogSlug.current != $slug]| order(_createdAt) [0...3] {
    "blogContent": blogContent[language->.shortLanguage == $lang][0],
    "featuredImage": singleImage,
    "slug": blogSlug{current}
  }
`
export default otherBlogs