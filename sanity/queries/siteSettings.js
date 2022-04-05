const siteSettings = `
*[_type == 'siteSetting'][0]{
    "logo": logo{...,singleImage{asset->}},
    "favicon": favicon{asset->}
  }
`

export default siteSettings