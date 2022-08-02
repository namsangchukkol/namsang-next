const blogs = `
    *[_type == 'blogs']| order(_updatedAt){
        ...,
        blogContent[language->.shortLanguage == $lang][0],
        blogSlug,
        singleImage
    }
`

export default blogs

// [$min...$max]