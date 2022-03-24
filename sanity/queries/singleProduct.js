const singleProduct = `
    *[_type == 'products' && pSlug.current == $slug][0]{
        ...,
        productCategories->,
        productConditions[0]->{productCondition[languageOption->.shortLanguage == $lang]},
        productStatus->,
        productContent[languageOption->.shortLanguage == $lang][0],
        productHighlights[language->.shortLanguage == $lang][0],

    }
`
export const productSlug = `
*[_type == 'products']{
    "slug": pSlug
  }
`

export default singleProduct