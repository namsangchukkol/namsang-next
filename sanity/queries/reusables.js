import contactForms from "./contactForm"
import productsQuery from "./products"
import siteSettings from "./siteSettings"

const reusableQuery = `
*[_type == 'reusableComponents'][0]{

    "header" : *[_type == 'header' && languageOption->.shortLanguage == $lang][0]{
      menuList[]{
        ...,
        "slug": slug.current
        }
    },
    "contactForm": ${contactForms},
    "map": *[_type == 'mapSection'][0],
    "otherProducts": ${productsQuery},
    "siteSettings": ${siteSettings}
  }
`

export default reusableQuery