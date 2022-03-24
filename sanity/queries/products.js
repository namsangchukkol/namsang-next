const productsQuery = `
*[_type == 'products'] | order(_createdAt) [0...3]{
    "name": productName,
    "image": imageGallery[chosenImage == true][0],
    "slug": pSlug.current,
    "text": productContent[languageOption->.shortLanguage == $lang]{
      productDescription[0],
      productTitle
    }[0]
  }  
`
export default productsQuery