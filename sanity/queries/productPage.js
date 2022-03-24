const productPage = `
*[_type == 'productPage' && metaData.language->.shortLanguage == $lang][0]{
  body[]{
    ...,
    _type == 'bannerTemplate' => {banner{...,banner{...,bannerTemplate2->
      {
         ...,
         formTitle[languageOption->.shortLanguage == $lang][0],
         formSubmit[languageOption->.shortLanguage == $lang][0],
         formList[]->{contactType, contactLanguage[language->.shortLanguage == $lang][0]}
          }
        }
       }
     },
    _type == 'generatorShowcase' => {content{
      ...,
      productGallery[]->{
        "slug": pSlug.current,
        "name": productName,
        "singleImage": {...imageGallery[chosenImage == true][0]{...singleImage}}
    }
  }},
    _type == 'usedMachineShowcase' => {content{
      ...,
      productGallery[]->{
        "slug": pSlug.current,
        "name": productName,
        "singleImage": {...imageGallery[chosenImage == true][0]{...singleImage}}
    }
  }},
  },
  metaData,
}
`
export default productPage